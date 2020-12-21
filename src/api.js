// make api calls against the backend
// exports:
//   get - make a get call
//   post - make a post call

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
