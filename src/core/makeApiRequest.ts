import { fetchInterceptor } from './interceptor';

export interface HttpResponse<T> {
  ok?: boolean;
  status: number;
  statusText?: string;
  headers?: Headers;
  data: T;
  error?: string;
}

export const makeApiRequest = async <T>(
  url: string,
  method: string,
  body?: unknown,
  additionalOptions?: RequestInit
): Promise<HttpResponse<T>> => {
  const headers = new Headers(additionalOptions?.headers);
  if (method !== 'GET' && !headers.has('Content-Type')) {
    headers.append('Content-Type', 'application/json');
  }

  const requestOptions: RequestInit = {
    method,
    headers,
    ...additionalOptions,
    body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
  };
  const fullUrl = `http://127.0.0.1:8000/api${url}`;
  const response = await fetchInterceptor(fullUrl, requestOptions);

  const data = await response.json().catch((e) => ({})); // Fallback to an empty object on JSON parse error
  if (!response.ok) {
    throw new Error(
      `API error with status ${response.status}: ${JSON.stringify(data.error || response.statusText)}`
    );
  }
  return {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    data,
  };
};
