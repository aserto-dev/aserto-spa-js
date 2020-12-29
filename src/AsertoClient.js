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
    if (!options || !options.accessToken) {
      throw new Error('AsertoClient: must provide access token');
    }
    this.token = options.accessToken;
    this.endpoint = options.accessMapEndpoint || '/__accessmap';
    this.service = options.serviceUrl || new URL(window.location.origin);
  }

  async reload() {
    const [response, error] = await get(this.service, this.token, this.endpoint);
    if (error) {
      throw new Error(`AsertoClient: ${error.message}`);
    } else {
      const map = await response.json();
      this.__accessMap = map;
    }
  }

  accessMap() {
    return this.__accessMap;
  }

  resourceMap(path) {
    const map = (this.__accessMap[path] && this.__accessMap[path].verb) || {};
    const defaultMap = {
      visible: false,
      enabled: false,
      allowed: false
    };
    map.GET = map.GET && defaultMap;
    map.PUT = map.PUT && defaultMap;
    map.DELETE = map.DELETE && defaultMap;
    map.POST = map.POST && defaultMap;
    return map;
  }
}
