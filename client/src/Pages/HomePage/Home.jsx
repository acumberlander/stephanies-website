import { Fade, Typography, Input, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import HomeCardList from "../../components/HomeComponents/HomeCardList/HomeCardList";
import MyCarousel from "../../components/HomeComponents/MyCarousel/MyCarousel";
import { useModal } from "../../context/ModalContext";
import "./Home.scss";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { openModal } = useModal();

  const handleNewMember = () => {
    scrollToTop();
    openModal(true);
  };

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
          <Button
            className="join-button"
            variant="text"
            onClick={handleNewMember}
          >
            Join
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
