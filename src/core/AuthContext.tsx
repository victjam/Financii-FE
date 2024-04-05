import React from "react";
import { AuthContextInterface } from "./interface/authContext.interface";

const AuthContext = React.createContext<AuthContextInterface>({
  state: {
    isAuthenticated: false,
  },
  login: () => {},
  logout: () => {},
});

export default AuthContext;
