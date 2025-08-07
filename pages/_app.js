import "react-toastify/dist/ReactToastify.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-modal-video/scss/modal-video.scss';
import GlobalAOSProvider from "../GlobalAOSProvider/GlobalAOSProvider ";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/pagination';
import '../assets/frontend/styles/fontawesome.css';
import '../assets/frontend/styles/themify-icons.css';
import '../assets/frontend/styles/animate.min.css';
import '../assets/frontend/styles/cursor.css';
import '../assets/frontend/styles/style.css';
import '../assets/frontend/styles/globals.css';
import '../assets/frontend/styles/dashboard.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Head from "next/head";
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Aincore</title>
      </Head>
      <AuthProvider>
        <GlobalAOSProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </GlobalAOSProvider>
      </AuthProvider>
    </div>
  );
}


export default MyApp
