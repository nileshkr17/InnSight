import React, { createContext, useState, useEffect } from "react";
// import { networkAdapter } from 'services/NetworkAdapter';
import axios from "axios";

export const AuthContext = createContext();

/**
 * Provides authentication state and user details to the application.
 * @namespace AuthProvider
 * @component
 */
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [authCheckTrigger, setAuthCheckTrigger] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const response = await axios.get("http://127.0.0.1:6969/auth/login");
      if (response && response.data) {
        setIsAuthenticated(response.data.isAuthenticated);
        setUserDetails(response.data.userDetails);
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
