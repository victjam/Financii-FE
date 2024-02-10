import { useState } from "react";
import AuthContext from "./authContext";

interface AuthContextState {
  isAuthenticated: boolean;
  token: string | null;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthContextState>({
    isAuthenticated: false,
    token: null,
  });

  const login = (token: string) => {
    setState({ ...state, isAuthenticated: true, token });
  };

  const logout = () => {
    setState({ ...state, isAuthenticated: false, token: null });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
