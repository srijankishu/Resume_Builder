import { createContext, useState, useEffect } from "react";
import {fetchProtectedData} from "../components/Auth.jsx"; // your existing utility

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Run on first load to check token
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      const data = await fetchProtectedData(); // make sure this checks token
      setIsLoggedIn(!!data);
      setLoading(false);
    };
    verifyToken();
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
     setIsLoggedIn(true);    // ✅ Immediately update state
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
