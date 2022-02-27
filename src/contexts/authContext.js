import { createContext, useEffect, useState } from 'react';
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

import { login } from '../modules/auth/auth.service';
import { v4 as uuidv4 } from 'uuid';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const isAuthenticated = !!user;

  // useEffect(() => {
  //   const { access_token } = parseCookies();

  //   if (access_token) {
  //     recoverUserInformation().then((response) => {
  //       setUser(response.user);
  //     });
  //   }
  // }, []);

  async function signIn({ email, password }) {
    const { device_fingerprint } = parseCookies();

    const user = await login({
      email,
      password,
      device_fingerprint: device_fingerprint ?? uuidv4(),
    });

    setCookie(undefined, 'access_token', user.access_token);

    setCookie(undefined, 'refresh_token', user.refresh_token);

    setCookie(undefined, 'device_fingerprint', user.device_fingerprint);

    setUser(user);

    Router.push('/dashboard');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
