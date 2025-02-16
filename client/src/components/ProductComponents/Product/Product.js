import { useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./Product.scss";

const Product = ({ product }) => {
  const [imageLoaded, setimageLoaded] = useState(false);

  const setPicture = () => {
    setimageLoaded(true);
  };

  const loadingClass =
    imageLoaded === false ? "loading-spinner-container" : "hidden";

  let productClass;
  let overlayImageClass;

  if (imageLoaded === false) {
    productClass = "hidden";
    overlayImageClass = "hidden";
  } else {
    productClass = !product.images[1]
      ? "only-one-product-image"
      : "product-image";
    overlayImageClass = "product-image-overlay";
  }

  return (
    <div className="product-container">
      <Link to={`/product/${product.id}`}>
        <div className={loadingClass}>
          <CircularProgress size={80} />
        </div>
        <img
          onLoad={setPicture}
          className={productClass}
          alt=""
          src={product.images[0]}
        />
        {product.images[1] && (
          <img className={overlayImageClass} alt="" src={product.images[1]} />
        )}
      </Link>
      <Link to={`/product/${product.id}`} className="card-content">
        <Typography variant="h6" className="product-name">
          {product.name}
        </Typography>
        <hr className="line-break" />
        <Typography variant="h6" className="price">
          ${product.price}
        </Typography>
      </Link>
    </div>
  );
};

export default Product;
