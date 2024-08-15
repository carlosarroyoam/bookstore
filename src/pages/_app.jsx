import App from 'next/app';
import { parseCookies } from 'nookies';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Main from '../components/main/Main';
import { AuthProvider } from '../contexts/authContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps, authenticated }) {
  return (
    <>
      <AuthProvider authenticated={authenticated}>
        <Header />
        <Main>
          <Component {...pageProps} />
        </Main>
        <Footer />
      </AuthProvider>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
MyApp.getInitialProps = async (appContext) => {
  const { refresh_token } = parseCookies(appContext.ctx);

  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { authenticated: !!refresh_token, ...appProps };
};

export default MyApp;
