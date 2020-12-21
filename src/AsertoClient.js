import { get } from './api'

export default class AsertoClient {
  constructor(options) {
    this.token = options.token;
    this.endpoint = options.endpoint;
  }

  async getAuthorizationMap() {
    return await get(this.token, 'authzmap');
  }
}