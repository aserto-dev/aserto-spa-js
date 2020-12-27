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
        visible: getpath & VISIBLE ? true : false,
        enabled: getpath & ENABLED ? true : false,
        allowed: getpath & ALLOWED ? true : false,
      },
      post: {
        visible: postpath & VISIBLE ? true : false,
        enabled: postpath & ENABLED ? true : false,
        allowed: postpath & ALLOWED ? true : false,
      },
      put: {
        visible: putpath & VISIBLE ? true : false,
        enabled: putpath & ENABLED ? true : false,
        allowed: putpath & ALLOWED ? true : false,
      },
      delete: {
        visible: deletepath & VISIBLE ? true : false,
        enabled: deletepath & ENABLED ? true : false,
        allowed: deletepath & ALLOWED ? true : false,
      }
    }
  }
}
