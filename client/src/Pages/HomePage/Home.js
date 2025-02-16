import { Fade, Typography, Input, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import HomeCardList from "../../components/HomeComponents/HomeCardList/HomeCardList";
import MyCarousel from "../../components/HomeComponents/MyCarousel/MyCarousel";
import "./Home.scss";

const Home = () => {
  if (window.scrollY !== 0) {
    window.scrollTo({ left: 0, top: 0, behavior: "auto" });
  }

  return (
    <div className="home-container">
      {/* <Carousel /> */}
      <MyCarousel />
      <Fade in={true} timeout={1000}>
        <Grid container spacing={8} className="options">
          <HomeCardList />
        </Grid>
      </Fade>
      <div className="discount-container">
        <Typography className="pre-header" variant="h4">
          Become a member and receive
        </Typography>
        <Typography className="discount-header" variant="h1">
          10% OFF YOUR FIRST ORDER
        </Typography>
        <div className="input-and-button">
          <label htmlFor="email-input"></label>
          <Input
            id="email-input"
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
