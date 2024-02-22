import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const setAuthToken = (newToken) => {
    setToken(newToken);
  };

  // Check if 'children' is provided before rendering
  if (!children) {
    console.error("AuthProvider requires 'children' prop.");
    return null;
  }

  return (
    <AuthContext.Provider value={{ token, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
