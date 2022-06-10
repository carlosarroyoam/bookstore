import Router from 'next/router';
import { parseCookies, setCookie } from 'nookies';
import { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { login, logout } from '../services/auth.service';

export const AuthContext = createContext({});

export function AuthProvider({ authenticated, children }) {
  const [deviceFingerprint, setDevicefingerprint] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(authenticated);

  useEffect(() => {
    if (!parseCookies().device_fingerprint) {
      setCookie(undefined, 'device_fingerprint', uuidv4());
    }

    setDevicefingerprint(parseCookies().device_fingerprint);
  }, []);

  async function logIn({ email, password }) {
    await login({
      email,
      password,
      device_fingerprint: deviceFingerprint,
    });

    setIsAuthenticated(true);

    Router.push('/users');
  }

  async function logOut() {
    await logout({
      device_fingerprint: deviceFingerprint,
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
