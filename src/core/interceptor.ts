import useAuthStore from "./store/useAuthStore";

export const fetchInterceptor = async (
  url: string,
  options: RequestInit = {}
) => {
  const setIsAuthenticated = useAuthStore.getState().setIsAuthenticated;

  const token = sessionStorage.getItem("token");

  if (token) {
    options.headers = new Headers(options.headers);
    options.headers.append("Authorization", `Bearer ${token}`);
  }

  try {
    const response = await fetch(url, {
      ...options,
    });

    if (response.status === 401 || response.status === 403) {
      console.log("Authentication error, logging out");
      setIsAuthenticated(false);
      throw new Error(`Authentication error with status ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error(`Network or other error when requesting ${url}:`, error);
    throw error;
  }
};
