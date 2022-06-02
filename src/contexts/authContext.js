import { createContext, useState } from 'react';
import { parseCookies } from 'nookies';
import Router from 'next/router';

import { login, logout } from '../services/auth.service';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function logIn({ email, password }) {
    const { device_fingerprint } = parseCookies();

    await login({
      email,
      password,
      device_fingerprint,
    });

    setIsAuthenticated(true);

    Router.push('/users');
  }

  async function logOut() {
    const { device_fingerprint } = parseCookies();

    await logout({
      device_fingerprint,
    });

    setIsAuthenticated(false);

    Router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ logIn, logOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
