import { get } from './api'

export default class AsertoClient {
  constructor(options) {
    if (!options || !options.accessToken) {
      throw new Error('AsertoClient: must provide access token');
    }
    this.token = options.accessToken;
    this.endpoint = options.accessMapEndpoint || '/__accessmap';
    this.service = options.serviceUrl || new URL(window.location.origin);
  }

  async loadAccessMap() {
    const [map, error] = await get(this.service, this.token, this.endpoint);
    if (error) {
      throw new Error(`AsertoClient: ${error.message}`);
    } else {
      this.__accessMap = map;
    }
  }

  accessMap() {
    return this.__accessMap;
  }
}