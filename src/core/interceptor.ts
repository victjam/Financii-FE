import useAuthStore from './store/useAuthStore';

export const fetchInterceptor = async (
  url: string,
  options: RequestInit = {}
) => {
  const setIsAuthenticated = useAuthStore.getState().setIsAuthenticated;

  const token = sessionStorage.getItem('token');

  if (token) {
    options.headers = new Headers(options.headers);
    options.headers.append('Authorization', `Bearer ${token}`);
  }

  try {
    const response = await fetch(url, {
      ...options,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({
        message: response.statusText,
        code: response.status,
      }));

      if (response.status === 401 || response.status === 403) {
        setIsAuthenticated(false);
      }

      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw {
        status: response.status,
        message: errorBody.message || 'Unknown error occurred.',
      };
    }

    return response;
  } catch (error) {
    console.error(`Network or other error when requesting ${url}:`, error);
    throw error;
  }
};
