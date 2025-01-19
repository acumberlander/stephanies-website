import React from "react";
import { Fade, Typography, Input, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import accessoryPic from "../../assets/accessories/leather-necklace.jpg";
import glasswarePic from "../../assets/glassware/steph-drinking.jpg";
import teePic from "../../assets/tees/tee-category.png";
import steph1 from "../../assets/steph/steph-1.jpg";
import steph2 from "../../assets/denim/denim-one-shot.jpg";
import tribalPic from "../../assets/tribal-pic.png";
import MyGallery from "../../components/HomeComponents/MyGallery/MyGallery";
import HomeCard from "../../components/HomeComponents/HomeCard/HomeCard";
import NewCarousel from "../../components/HomeComponents/NewCarousel/NewCarousel";
import "./Home.scss";

const Home = () => {
  if (window.scrollY !== 0) {
    window.scrollTo({ left: 0, top: 0, behavior: "auto" });
  }

  return (
    <div className="home-container">
      {/* <Carousel /> */}
      <NewCarousel />
      <Fade in={true} timeout={1000}>
        <Grid container spacing={8} className="options">
          <HomeCard
            page="accessories"
            image={accessoryPic}
            category="Accessories"
          />
          <HomeCard
            page="glassware"
            image={glasswarePic}
            category="Glassware"
          />
          <HomeCard
            style={{ objectPosition: "30%" }}
            page="tees"
            image={teePic}
            category="Tees"
          />
          <HomeCard
            page="adams-apple-ascots"
            image={steph1}
            topText="Adam's Apple"
            bottomText="Ascots"
          />
          <HomeCard
            page="venomous-denim"
            image={steph2}
            topText="Venomous Denim"
          />
          <HomeCard
            page="manifest-N2-art"
            image={tribalPic}
            disabled={true}
            topText="Manifest N2 Art"
            bottomText="(Coming Soon)"
          />
        </Grid>
      </Fade>
      <MyGallery />
      <div className="discount-container">
        <Typography className="pre-header" variant="h4">
          Become a member and receive
        </Typography>
        <Typography className="discount-header" variant="h1">
          10% OFF YOUR FIRST ORDER
        </Typography>
        <div className="input-and-button">
          <Input
            className="email-input"
            placeholder="Enter your email here*"
            disableUnderline={true}
          />
          <Button className="join-button" variant="text">
            Join
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
