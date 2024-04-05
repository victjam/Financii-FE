export interface AuthContextInterface {
  state: AuthContextStateInterface;
  login: () => void;
  logout: () => void;
}

export interface AuthContextStateInterface {
  isAuthenticated: boolean;
}
