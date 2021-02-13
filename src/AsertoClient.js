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
    this.endpoint = options.displayStateMapEndpoint || '/__displaystatemap';
    this.service = options.serviceUrl || new URL(window.location.origin);
  }

  async reload(headers) {
    let response, error;
    try {
      [response, error] = await get(this.service, this.token, this.endpoint, headers);
    } catch (err) {
      throw err;
    }
    if (error) {
      throw new Error(`AsertoClient: ${error.message || error}`);
    } else {
      const map = await response.json();
      this.__displayStateMap = map;
    }  
  }

  displayStateMap() {
    return this.__displayStateMap;
  }

  getDisplayState(method, path) {
    const key = path ? `${method}${path}` : method;
    const map = this.__displayStateMap[key];
    if (!map) {
      throw new Error(`AsertoClient: access map does not contain the key ${key}`);
    }
    return map;
  }
}
