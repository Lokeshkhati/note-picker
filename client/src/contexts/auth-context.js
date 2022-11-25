import { createContext, useState, useContext, useEffect } from "react";


const AuthContext = createContext()

const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {


  return (
    <AuthContext.Provider   >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };