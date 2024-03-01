import React, { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const signIn = useCallback(() => {
    localStorage.setItem("isLoggedIn", "true");
    setLoggedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("LoginData");
    setLoggedIn(false);
  }, []);

  const authContextValue = {
    isLoggedIn,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
