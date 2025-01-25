import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { capitalizeFirstLetter } from "../../../utils/helpers/helpers";
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
				<Link className="option-image-container" to={`/shop/${page}`}>
					<div className={overlayStyle} />
					{capitalizeFirstLetter(page) ? (
						<h1 className="option-header">{capitalizeFirstLetter(page)}</h1>
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
