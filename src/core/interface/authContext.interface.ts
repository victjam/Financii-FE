export interface AuthContextInterface {
  state: AuthContextStateInterface;
  login: (token: string) => void;
  logout: () => void;
}

export interface AuthContextStateInterface {
  isAuthenticated: boolean;
  token: string | null;
}
