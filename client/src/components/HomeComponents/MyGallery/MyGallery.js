import { Typography } from "@mui/material";
import "./MyGallery.scss";

const MyGallery = () => {
  // const classes = useStyles();

  return (
    <div className="gallery-container">
      <Typography className="gallery-header" variant="h3">
        Follow Us on IG{" "}
        <a
          className="insta-tag"
          href="https://www.instagram.com/sexesbystephanie/"
          target="_blank"
          rel="noreferrer"
        >
          @sexesbystephanie
        </a>
      </Typography>
      {/* <Gallery photos={photos} /> */}
    </div>
  );
};

export default MyGallery;
