import useAuthStore from "./store/useAuthStore";

export const fetchInterceptor = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(url, options);
    if (response && !response.ok) {
      if (response.status === 401 || response.status === 403) {
        const setIsAuthenticated = useAuthStore.getState().setIsAuthenticated;
        setIsAuthenticated(false);
      }
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error(`Network or other error when requesting ${url}:`, error);
    throw error;
  }
};
