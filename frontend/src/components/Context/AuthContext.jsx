import React, { createContext, useState, useEffect } from "react";
// import { networkAdapter } from "services/NetworkAdapter";
import axios from "axios";

export const AuthContext = createContext();

/**
 * Provides authentication state and user details to the application.
 * @namespace AuthProvider
 * @component
 */
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [authCheckTrigger, setAuthCheckTrigger] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const response = await axios.get("http://127.0.0.1:6969/auth/auth-user");
      console.log("auth check");
      console.log(response.data);
      if (response && response.data) {
        console.log("checking", response.data.data.isAuthenticated);

        setIsAuthenticated(response.data.data.isAuthenticated);
        setUserDetails(response.data.data.userDetails);
      }
    };

    checkAuthStatus();
  }, [authCheckTrigger]);

  const triggerAuthCheck = () => {
    setAuthCheckTrigger((prev) => !prev);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userDetails, triggerAuthCheck }}
    >
      {children}
    </AuthContext.Provider>
  );
};
