import { get } from './api'

export default class AsertoClient {
  constructor(options) {
    if (!options || !options.token) {
      throw new Error('AsertoClient: must provide access token');
    }
    this.token = options.token;
    this.endpoint = options.endpoint || '__accessmap';
  }

  async getAccessMap() {
    return await get(this.token, this.endpoint);
  }
}