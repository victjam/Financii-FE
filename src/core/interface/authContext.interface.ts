export interface AuthContextInterface {
  state: AuthContextStateInterface;
}

export interface AuthContextStateInterface {
  isAuthenticated: boolean;
}
