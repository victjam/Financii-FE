/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeApiRequest } from "./makeApiRequest";
import useAuthStore from "./store/useAuthStore";

interface ApiResponse {
  data: {
    isAuthenticated: boolean;
  };
}

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      const checkSession = async () => {
        try {
          const response: ApiResponse = await makeApiRequest(
            "http://127.0.0.1:8000/api/auth/session",
            "GET"
          );
          if (!response.data.isAuthenticated) {
            navigate("/login");
          } else {
            setIsAuthenticated(true);
            setIsChecking(false);
          }
        } catch (error) {
          console.error("Session check failed", error);
          navigate("/login");
        }
      };

      checkSession();
    } else {
      setIsChecking(false);
    }
  }, []);

  if (isChecking) {
    return <div>Checking authentication...</div>;
  }

  return <>{children}</>;
};
