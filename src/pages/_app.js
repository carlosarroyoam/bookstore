import Footer from '../shared/components/footer/Footer';
import Header from '../shared/components/header/Header';
import { Normalize } from 'styled-normalize';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Normalize></Normalize>

      <Header></Header>

      <main>
        <Component {...pageProps} />
      </main>

      <Footer></Footer>
    </>
  );
}

export default MyApp;
