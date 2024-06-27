// make api calls against the backend
// exports:
//   get - make a get call
//   post - make a post call

type ResponseResult =
  | { response: Response; error: null }
  | { response: null; error: Error | string };

export async function get(
  service: URL | string,
  token: string,
  path: string,
  headers: Record<string, string> = {}
): Promise<ResponseResult> {
  // construct API service URL
  const url = service + path;
  headers.Authorization = `Bearer ${token}`;
  headers["Content-Type"] = "application/json";

  try {
    const response = await fetch(url, {
      headers: headers,
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`GET ${url}: ${text}`);
      return { response: null, error: text };
    }

    return { response, error: null };
  } catch (error) {
    console.error(`GET ${url}: ${error}`);
    return { response: null, error: error as Error };
  }
}

export async function post(
  service: URL | string,
  token: string,
  path: string,
  data: RequestInit["body"],
  headers: Record<string, string> = {}
): Promise<ResponseResult> {
  try {
    // construct API service URL
    const url = service + path;
    headers.Authorization = `Bearer ${token}`;
    headers["Content-Type"] = "application/json";

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: data,
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`GET ${url}: ${text}`);
      return { response: null, error: text };
    }

    return { response, error: null };
  } catch (error) {
    console.error(error);
    return { response: null, error: error as Error };
  }
}
