import { parseCookies, setCookie } from 'nookies';
import { v4 as uuidv4 } from 'uuid';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Main from '../components/main/Main';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const { device_fingerprint } = parseCookies();
  if (!device_fingerprint) setCookie(undefined, 'device_fingerprint', uuidv4());

  return (
    <>
      <AuthProvider>
        <Header />

        <Main>
          <Component {...pageProps} />
        </Main>

        <Footer />
      </AuthProvider>
    </>
  );
}

export default MyApp;
