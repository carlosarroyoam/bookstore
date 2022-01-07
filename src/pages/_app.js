import '../styles/globals.css';

import Footer from '../shared/components/footer/Footer';
import Main from '../shared/components/main/Main';
import Header from '../shared/components/header/Header';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Header /> */}

      <Main>
        <Component {...pageProps} />
      </Main>

      {/* <Footer /> */}
    </>
  );
}

export default MyApp;
