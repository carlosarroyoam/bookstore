import { createContext } from 'react';
import { parseCookies } from 'nookies';
import Router from 'next/router';

import { login, logout } from '../modules/auth/auth.service';

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
