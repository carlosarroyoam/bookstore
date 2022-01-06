import Footer from '../shared/components/footer/Footer';
import Main from '../shared/components/Main';
import Header from '../shared/components/header/Header';
import { Normalize } from 'styled-normalize';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Normalize />

      <Header />

      <Main>
        <Component {...pageProps} />
      </Main>

      <Footer />
    </>
  );
}

export default MyApp;
