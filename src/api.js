// make api calls against the backend
// exports:
//   get - make a get call
//   post - make a post call

export async function get(service, token, path, headers = {}) { 
  // construct API service URL
  const url = service + path;
  headers.Authorization = `Bearer ${token}`;
  headers['Content-Type'] = 'application/json';

  try {
    const response = await fetch(url, {
      headers: headers
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`GET ${url}: ${text}`);
      return [null, text];
    }
    
    return [response, null];
  } catch (error) {
    console.error(`GET ${url}: ${error}`);
    return [null, error];
  }
}

export async function post(service, token, path, data, headers = {}) { 
  try {
    // construct API service URL
    const url = service + path;
    headers.Authorization = `Bearer ${token}`;
    headers['Content-Type'] = 'application/json';

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: data
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`GET ${url}: ${text}`);
      return [null, text];
    }
    
    return [response, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
}
