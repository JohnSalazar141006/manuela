import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { UserSession } from '../types';

interface AuthCtx {
  user: UserSession | null;
  login: (u: UserSession) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('nexo_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (u: UserSession) => {
    localStorage.setItem('nexo_token', u.token);
    localStorage.setItem('nexo_user', JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('nexo_token');
    localStorage.removeItem('nexo_user');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
};
