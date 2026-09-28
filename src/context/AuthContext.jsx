import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('moviebookToken') || '');

  useEffect(() => {
    const storedUser = localStorage.getItem('moviebookUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('moviebookToken', authToken);
    localStorage.setItem('moviebookUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('moviebookToken');
    localStorage.removeItem('moviebookUser');
  };

  const value = {
    user,
    token,
    login,
    logout,
    setUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
