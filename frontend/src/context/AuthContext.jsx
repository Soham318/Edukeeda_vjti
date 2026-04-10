import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  };

  const loginWithOtp = async (phone) => {
    const { data } = await api.post('/auth/otp', { phone });
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  };

  const loginWithGoogle = async (email, name) => {
    const { data } = await api.post('/auth/google', { email, name });
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  };

  const registerCandidate = async (userData) => {
    const { data } = await api.post('/auth/register', userData);
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithOtp, loginWithGoogle, registerCandidate, logout, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
