import { createContext, useState } from 'react';
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

import { login } from '../modules/auth/auth.service';
import { v4 as uuidv4 } from 'uuid';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const isAuthenticated = !!user;

  async function signIn({ email, password }) {
    const { device_fingerprint } = parseCookies();
    if (!device_fingerprint) setCookie(undefined, 'device_fingerprint', uuidv4());

    const user = await login({
      email,
      password,
      device_fingerprint: device_fingerprint,
    });

    setUser(user);

    Router.push('/dashboard');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
