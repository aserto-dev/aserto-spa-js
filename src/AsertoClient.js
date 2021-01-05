import { get } from './api'

const VISIBLE = 4;
const ENABLED = 2;
const ALLOWED = 1;

export {
  VISIBLE,
  ENABLED,
  ALLOWED
};

export default class AsertoClient {
  constructor(options) {
    this.defaultMap = options && options.defaultMap || {
      visible: true,
      enabled: true,
      allowed: false
    };

    if (!options || !options.accessToken) {
      throw new Error('AsertoClient: must provide access token');
    }
    this.token = options.accessToken;
    this.endpoint = options.accessMapEndpoint || '/__accessmap';
    this.service = options.serviceUrl || new URL(window.location.origin);
  }

  async reload() {
    try {
      const [response, error] = await get(this.service, this.token, this.endpoint);
      if (error) {
        throw new Error(`AsertoClient: ${error.message}`);
      } else {
        const map = await response.json();
        this.__accessMap = map;
      }  
    } catch (error) {
      this.__accessMap = null;
      throw error;
    }
  }

  accessMap() {
    return this.__accessMap;
  }

  resourceMap(path) {
    const map = (this.__accessMap[path] && this.__accessMap[path].verb) || {};
    map.GET = map.GET || this.defaultMap;
    map.PUT = map.PUT || this.defaultMap;
    map.DELETE = map.DELETE || this.defaultMap;
    map.POST = map.POST || this.defaultMap;
    return map;
  }
}
