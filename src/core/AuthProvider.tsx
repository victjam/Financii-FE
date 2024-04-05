import AuthContext from "./AuthContext";
import useAuthStore from "./store/useAuthStore";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { setIsAuthenticated, isAuthenticated } = useAuthStore();
  const state = { isAuthenticated };

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
