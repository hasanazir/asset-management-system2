import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [userName, setUserName] = useState(localStorage.getItem("name"));
  const [base, setBase] = useState(localStorage.getItem("base"));

  const login = (token, role, name, base) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);
    localStorage.setItem("base", base);
    setToken(token);
    setRole(role);
    setUserName(name);
    setBase(base);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("base");
    setToken(null);
    setRole(null);
    setUserName(null);
    setBase(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, base, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
