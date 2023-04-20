import "../styles/globals.css";
import "./css/login_signup.css"; // USE IS ON MODULE LEVEL IN LOGIN/SIGNUP
import "./css/owl.css"; // USE IS ON MODULE LEVEL IN LOGIN/SIGNUP
import "./css/productcarouselview.css"; // USE IS ON MODULE LEVEL IN LOGIN/SIGNUP
import "./css/productscardview.css"; // USE IS ON MODULE LEVEL IN LOGIN/SIGNUP
import Navbar from "../Components/MainComponents/Navbar";
import Script from "next/script";
import Context from "../context/accessacc";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/docs/assets/css/animate.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Context>
        <Navbar />
        <Component {...pageProps} />
        <Script
          src="https://kit.fontawesome.com/afb5121dfa.js"
          crossorigin="anonymous"
        ></Script>
      </Context>
    </>
  );
}

export default MyApp;
