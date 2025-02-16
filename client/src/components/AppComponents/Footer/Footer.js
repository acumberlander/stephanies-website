import { useState } from "react";
import instaIcon from "../../../assets/icons/socialMedia/instagram-5-256.png";
import facebookIcon from "../../../assets/icons/socialMedia/facebook-4-256.png";
import trademark from "../../../assets/icons/icons8-trademark-52.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import logo from "../../../assets/logos/logo-2.png";
import "./Footer.scss";

const Footer = () => {
  const [backToTop, setBackToTop] = useState("hidden");
  const scrollToTop = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", () => {
    let top = window.scrollY;
    if (top > 500) {
      setBackToTop("back-to-top");
    } else {
      setBackToTop("hidden");
    }
  });

  return (
    <footer className="footer-container">
      <div className="logo-and-trademark-container">
        <img className="logo" src={logo} alt="logo" />
        <img className="trademark" src={trademark} alt="trademark" />
      </div>
      <div className="social-media">
        <a
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/Sexes-Custom-Brand-149443252511629"
        >
          <img className="social-icon" src={facebookIcon} alt="facebook" />
        </a>
        <a
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/sexesbystephanie/"
        >
          <img className="social-icon" src={instaIcon} alt="instagram" />
        </a>
        <div onClick={scrollToTop} className={backToTop}>
          <ArrowForwardIosIcon className="arrow" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
