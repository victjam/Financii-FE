import { useState } from "react";
import AuthContext from "./AuthContext";
import { AuthContextStateInterface } from "./interface/authContext.interface";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthContextStateInterface>({
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
