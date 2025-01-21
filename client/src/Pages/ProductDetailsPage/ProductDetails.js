import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../../store/cartThunks/cartThunks";
import {
  Container,
  Select,
  Typography,
  MenuItem,
  FormControl,
  FormHelperText,
  Button,
  CircularProgress,
  Fade,
} from "@mui/material";
import PinterestIcon from "@mui/icons-material/Pinterest";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import ProductDetailsDropdowns from "../../components/ProductComponents/ProductDetailsDropdowns/ProductDetailsDropdowns";
import productModel from "../../Models/Product";
import "./ProductDetails.scss";

const ProductDetails = () => {
  const [size, setSize] = useState("Choose a size");
  const [sizeOptions, setSizeOptions] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [product, setProduct] = useState(productModel);
  const [displayedImage, setDisplayedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const allProducts = useSelector((state) => state.products);
  const { uid } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let params = useParams();
  // let sizeOptions = null;


  /**
   * Adds current product to the users cart. Updates the user state in redux
   */
  const handleAddToCart = () => {
    if (product.option_groups && product.option_groups[0]) {
      if (size === "Choose a size") {
        setHasError(true);
        return;
      }
      dispatch(addToCart({uid, product, quantity}));
      setHasError(false);
    } else {
      dispatch(addToCart({uid, product, quantity}));
      setHasError(false);
    }
    setQuantity(1);
    setSize("Choose a size");
  };

  useEffect(() => {
    const data = allProducts.items.filter((product) => {
      return product.id === params.id;
    });

    if (data && data.length) {
      setProduct(data[0]);
      setDisplayedImage(data[0].images[0]);
    }

    if (window.scrollY !== 0) {
      window.scrollTo(0, 0);
    }

    if (product.option_groups && product.option_groups[0]) {
      setSizeOptions([
        <MenuItem value={"Choose a size"} disabled>
          Choose a size
        </MenuItem>,
        ...product.option_groups[0].sizes.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option.name}
          </MenuItem>
        )),
      ]);
    }
  }, [params, sizeOptions, allProducts]);

  return (
    <Container className="container">
      <div className="content-container">
        <div className="product-and-details">
          {/* Left Section */}
          <div className="left-section">
            <Typography className="product-details-name" variant="h5">
              {product.name}
            </Typography>
            <div className="display-container">
              {!product ? (
                <CircularProgress size={80} />
              ) : (
                <Fade
                  in={product !== null}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(product !== null ? { timeout: 1000 } : {})}
                >
                  <img
                    className="product-detail-image"
                    src={displayedImage}
                    alt={product.name}
                  />
                </Fade>
              )}
            </div>

            {/* Images List */}
            <div style={{ display: "flex", margin: "10px 0" }}>
              {product.images.map((imageObj) => 
                <div
                  key={product.id}
                  onClick={(e) => setDisplayedImage(e.target.src)}
                  className="thumbnail-container"
                >
                  <img
                    key={product.id}
                    style={{
                      height: "50px",
                      width: "40px",
                      margin: "10px",
                      cursor: "pointer",
                      borderRadius: "0.2rem",
                    }}
                    src={imageObj}
                    alt={product.name}
                  />
                </div>
              )}
            </div>

            <Typography className="product-details-text">
              {product.name} - Lorem ipsum dolor sit amet consectetur
              adipisicing elit.
            </Typography>
          </div>
          {/* Right Section */}
          <div className="right-section">
            <Typography className="price-header">
              {product.price}
            </Typography>
            
            {sizeOptions.length > 0 && (
              <>
                <Typography className="size-header">Size</Typography>
                <FormControl required error={hasError}>
                  <Select
                    className="size-selection"
                    onChange={(e) => setSize(e.target.value)}
                    value={size}
                  >
                    {sizeOptions}
                  </Select>
                  {hasError && (
                    <FormHelperText>Please select a size</FormHelperText>
                  )}
                </FormControl>
              </>
            )}

            <Typography className="quantity-header">Quantity</Typography>

            <div className="quantity-container">
              <Button
                disabled={quantity < 2}
                className="quantity-button"
                onClick={() => setQuantity((prevQuantity) => prevQuantity - 1)}
              >
                -
              </Button>
              <Typography>{quantity}</Typography>
              <Button
                className="quantity-button"
                onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}
              >
                +
              </Button>
            </div>
            <br />

            <Button
              variant="contained"
              className="add-to-cart-button"
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
            <div className="accordion-container">
              <ProductDetailsDropdowns />
            </div>

            <div className="social-media-group">
              <PinterestIcon className="socialIcon" />
              <FacebookIcon className="socialIcon" />
              <TwitterIcon className="socialIcon" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
