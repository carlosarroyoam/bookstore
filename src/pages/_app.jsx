import { AuthProvider } from '../contexts/AuthContext';
import { setCookie } from 'nookies';
import { v4 as uuidv4 } from 'uuid';
import '../styles/globals.css';

import Footer from '../components/footer/Footer';
import Main from '../components/main/Main';
import Header from '../components/header/Header';

function MyApp({ Component, pageProps }) {
  setCookie(undefined, 'device_fingerprint', uuidv4());

  return (
    <>
      <AuthProvider>
        <Header />

        <Main>
          <Component {...pageProps} />
        </Main>

        {/* <Footer /> */}
      </AuthProvider>
    </>
  );
}

export default MyApp;
