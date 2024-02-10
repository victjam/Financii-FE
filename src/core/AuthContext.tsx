import React from "react";

interface AuthContextState {
  isAuthenticated: boolean;
  token: string | null;
}

export interface AuthContext {
  state: AuthContextState;
  login: (token: string) => void;
  logout: () => void;
}

interface AuthContextState {
  isAuthenticated: boolean;
  token: string | null;
}

const AuthContext = React.createContext<AuthContext>({
  state: {
    isAuthenticated: false,
    token: null,
  },
  login: () => {},
  logout: () => {},
});

export default AuthContext;
