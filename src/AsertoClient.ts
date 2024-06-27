import { post } from "./api";

const VISIBLE = 4;
const ENABLED = 2;
const ALLOWED = 1;

export { VISIBLE, ENABLED, ALLOWED };

export interface ClientOptions {
  accessToken: string;
  displayStateMapEndpoint?: string;
  serviceUrl?: URL;
  policyRoot?: string;
}

export default class AsertoClient {
  token: string;
  endpoint: string;
  service: URL;
  policyRoot: string;
  private __displayStateMap: Record<string, Record<string, boolean>>;

  constructor(options?: ClientOptions) {
    if (!options || !options.accessToken) {
      throw new Error("AsertoClient: must provide access token");
    }
    this.token = options.accessToken;
    this.endpoint = options.displayStateMapEndpoint || "/__displaystatemap";
    this.service = options.serviceUrl || new URL(window.location.origin);
    this.policyRoot = options.policyRoot || "";
    this.__displayStateMap = {};
  }

  async reload(
    body: RequestInit["body"],
    headers: Record<string, string> = {}
  ) {
    const result = await post(
      this.service,
      this.token,
      this.endpoint,
      body,
      headers
    );

    if (result.error !== null) {
      const { error } = result;
      throw new Error(
        `AsertoClient: ${error instanceof Error ? error.message : error}`
      );
    } else {
      const map = await result.response.json();
      this.__displayStateMap = map;
    }
  }

  displayStateMap() {
    return this.__displayStateMap;
  }

  getDisplayState(
    method: string,
    path?: string,
    policyRoot?: string
  ): Record<string, boolean> {
    const root = policyRoot || this.policyRoot;
    let key: string;
    if (path) {
      // path was passed in - use METHOD/path convention
      if (root) {
        // root was passed in - use root/METHOD/path
        key = `${root}/${method}${path}`;
      } else {
        key = `${method}${path}`;
      }
    } else {
      // treat the first argument as the key
      key = method;
    }
    const map = this.__displayStateMap[key];
    if (!map) {
      throw new Error(
        `AsertoClient: access map does not contain the key ${key}`
      );
    }
    return map;
  }
}
