import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import "./HomeCard.scss";

const HomeCard = ({
  image,
  category,
  style,
  page,
  topText,
  bottomText,
  disabled = false,
}) => {
  const overlayStyle = disabled ? "home-card-disabled" : "overlay";
  return (
    <Grid
      className="home-card-grid-container"
      size={{
        xs: 12,
        sm: 12,
        md: 6,
        lg: 4,
        xl: 4,
      }}
    >
      <Link
        className="option-image-container"
        to={page === "manifest-N2-art" ? "#" : `/shop/${page}`}
        id={page === "manifest-N2-art" ? "manifest-card" : null}
      >
        <div className={overlayStyle} />
        {category ? (
          <h1 className="option-header">{category}</h1>
        ) : (
          <div style={{ position: "absolute", textAlign: "center" }}>
            <h1 style={{ position: "relative" }} className="option-header">
              {topText}
            </h1>
            <h1 style={{ position: "relative" }} className="option-header">
              {bottomText}
            </h1>
          </div>
        )}
        <img style={style} className="option-images" alt="" src={image} />
      </Link>
    </Grid>
  );
};

export default HomeCard;
