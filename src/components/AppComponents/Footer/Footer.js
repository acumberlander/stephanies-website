import React, { useState } from "react";
import instaIcon from "../../../assets/socialMedia/instagram-5-256.png";
import facebookIcon from "../../../assets/socialMedia/facebook-4-256.png";
import trademark from "../../../assets/icons8-trademark-52.png";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import logo from "../../../assets/logos/logo-2.png";
import { useStyles } from "./footerStyles";

const Footer = () => {
  const classes = useStyles();
  const [backToTop, setBackToTop] = useState(classes.hidden);
  const scrollToTop = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", () => {
    let top = window.scrollY;
    if (top > 1000) {
      setBackToTop(classes.backToTop);
    } else {
      setBackToTop(classes.hidden);
    }
  });

  return (
    <footer className={classes.footerContainer}>
      <div>
        <img className={classes.logo} src={logo} alt="logo" />
        <img className={classes.trademark} src={trademark} alt="trademark" />
      </div>
      <div className={classes.socialMedia}>
        <a
          className={classes.footerLink}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/Sexes-Custom-Brand-149443252511629"
        >
          <img
            className={classes.socialIcon}
            src={facebookIcon}
            alt="facebook"
          />
        </a>
        <a
          className={classes.footerLink}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/sexesbystephanie/"
        >
          <img className={classes.socialIcon} src={instaIcon} alt="instagram" />
        </a>
        <div onClick={scrollToTop} className={backToTop}>
          <ExpandLessIcon className={classes.arrow} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
