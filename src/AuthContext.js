import React, { createContext, useState, useEffect, useContext } from "react";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import Pool from "./cognitoConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = Pool.getCurrentUser();
    if (currentUser) {
      currentUser.getSession((err, session) => {
        if (err) {
          setUser(null);
        } else {
          setUser(currentUser);
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
