import { get } from './api'

const VISIBLE = 1;
const ENABLED = 2;
const ALLOWED = 4;

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

  resourceMap(path) {
    const getpath = this.__accessMap[`${path}/get`];
    const postpath = this.__accessMap[`${path}/post`];
    const putpath = this.__accessMap[`${path}/put`];
    const deletepath = this.__accessMap[`${path}/delete`];
    return {
      get: {
        visible: getpath & VISIBLE,
        enabled: getpath & ENABLED,
        allowed: getpath & ALLOWED,
      },
      post: {
        visible: postpath & VISIBLE,
        enabled: postpath & ENABLED,
        allowed: postpath & ALLOWED,
      },
      put: {
        visible: putpath & VISIBLE,
        enabled: putpath & ENABLED,
        allowed: putpath & ALLOWED,
      },
      delete: {
        visible: deletepath & VISIBLE,
        enabled: deletepath & ENABLED,
        allowed: deletepath & ALLOWED,
      }
    }
  }
}
