// make api calls against the backend
// exports:
//   get - make a get call
//   post - make a post call
//   useApi - a React effect that returns { get, post }
//   [note: using the useApi effect is the proper way to structure API calls going forward]

import { useCallback } from 'react'

export async function get(token, path, headers = {}) { 
  // construct API service URL
  const baseUrl = window.location.origin;
  const urlObject = new URL(baseUrl);

  // replace port for local development from 3000 to 8080
  if (urlObject.port && urlObject.port > 80) {
    urlObject.port = 8080;
  }

  const urlPath = urlObject + path;

  headers.Authorization = `Bearer ${token}`;

  try {
    const response = await fetch(urlPath, {
      headers: headers
    });
    
    return [response, null];
  } catch (error) {
    console.error(`GET ${url}: ${error}`);
    return [null, error];
  }
}

export async function post(token, path, data, headers = {}) { 
  try {
    // construct API service URL
    const baseUrl = window.location.origin;
    const urlObject = new URL(baseUrl);

    // replace port for local development from 3000 to 8080
    if (urlObject.port && urlObject.port > 80) {
      urlObject.port = 8080;
    }

    const url = urlObject + path;
    headers.Authorization = `Bearer ${token}`;
    headers['Content-Type'] = 'application/json';

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: data
    });
    
    return [response, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
}

// define a custom effect that wraps the auth0 effect, gets a token, and calls the API method
export function useApi() {
  // create a callback around the GET call
  const callGet = useCallback((...p) => {
    async function callGet(token, path, headers = {}) {
      const [response, error] = await get(token, path, headers);
      return [response, error];
    }
    return callGet(...p);
  }, []);

  // create a callback around the POST call
  const callPost = useCallback((...p) => {
    async function callPost(token, ...p) {
      const [response, error] = await post(token, ...p);
      return [response, error];
    }
    return callPost(...p);
  }, []);

  return {
    get: callGet,
    post: callPost
  }
}
