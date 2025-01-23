import React from "react";
import Carousel from "react-material-ui-carousel";
import { carouselStylesObj } from "./carouselStyles";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./MyCarousel.scss";

const {
  indicatorContainerProps,
  indicatorIconButtonProps,
  activeIndicatorIconButtonProps,
} = carouselStylesObj;
const homeLogo = require("../../../assets/logos/logo-white.png");

const MyCarousel = () => {
  return (
    <>
      <div className="hero-overlay-container">
        <img className="hero-overlay" src={homeLogo} alt="sexes logo" />
        <Typography className="hero-subtitle">By Stephanie</Typography>
        <Link className="shop-link" to="/shop/all-products">
          <h3 className="link-text">Shop Now</h3>
        </Link>
      </div>
      <Carousel
        indicatorContainerProps={indicatorContainerProps}
        indicatorIconButtonProps={indicatorIconButtonProps}
        activeIndicatorIconButtonProps={activeIndicatorIconButtonProps}
        autoPlay={true}
        className="carousel-container"
        height={"100vh"}
      >
        <div className="image-div-1" />
        <div className="image-div-2" />
        <div className="image-div-3" />
        <div className="image-div-4" />
      </Carousel>
    </>
  );
};

export default MyCarousel;
