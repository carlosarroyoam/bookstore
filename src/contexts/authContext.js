import Router from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { login, logout } from '../services/auth.service';

export const AuthContext = createContext({});

export function AuthProvider({ authenticated, children }) {
  const [deviceFingerprint, setDevicefingerprint] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(authenticated);

  useEffect(() => {
    if (!localStorage.getItem('device_fingerprint')) {
      localStorage.setItem('device_fingerprint', uuidv4());
    }

    setDevicefingerprint(localStorage.getItem('device_fingerprint'));
  }, []);

  async function logIn({ email, password }) {
    try {
      await login({
        email,
        password,
        device_fingerprint: deviceFingerprint,
      });

      setIsAuthenticated(true);

      Router.push('/');
    } catch (error) {
      throw error;
    }
  }

  async function logOut() {
    try {
      await logout({
        device_fingerprint: deviceFingerprint,
      });

      setIsAuthenticated(false);

      Router.push('/login');
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ logIn, logOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
