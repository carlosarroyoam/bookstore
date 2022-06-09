import Router from 'next/router';
import { parseCookies } from 'nookies';
import { createContext } from 'react';
import { login, logout } from '../services/auth.service';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  async function logIn({ email, password }) {
    const { device_fingerprint } = parseCookies();

    await login({
      email,
      password,
      device_fingerprint,
    });

    Router.push('/users');
  }

  async function logOut() {
    const { device_fingerprint } = parseCookies();

    await logout({
      device_fingerprint,
    });

    Router.push('/login');
  }

  return <AuthContext.Provider value={{ logIn, logOut }}>{children}</AuthContext.Provider>;
}
