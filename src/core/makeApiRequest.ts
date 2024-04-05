import { fetchInterceptor } from "./interceptor";

export type HttpResponse<T> = {
  ok?: boolean;
  status: number;
  statusText?: string;
  headers?: Headers;
  data: T;
  error?: string;
};

export const makeApiRequest = async <T>(
  url: string,
  method: string,
  body?: unknown,
  additionalOptions?: RequestInit
): Promise<HttpResponse<T>> => {
  const headers = new Headers(additionalOptions?.headers || {});
  if (method !== "GET" && !headers.has("Content-Type")) {
    headers.append("Content-Type", "application/json");
  }

  const requestOptions: RequestInit = {
    method,
    headers,
    ...additionalOptions,
    body: method !== "GET" && body ? JSON.stringify(body) : undefined,
  };
  const response = await fetchInterceptor(url, requestOptions);
  const data: T = await response.json();
  return {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    data,
  };
};
