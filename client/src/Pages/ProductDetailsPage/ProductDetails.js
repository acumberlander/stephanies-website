import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cart";
import PinterestIcon from "@mui/icons-material/Pinterest";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import ProductDetailsDropdowns from "../../components/ProductComponents/ProductDetailsDropdowns/ProductDetailsDropdowns";
import { fetchProductById } from "../../actions/products";
import productModel from "../../Models/Product";
import "./ProductDetails.scss";

const ProductDetails = () => {
  const [size, setSize] = useState("Choose a size");
  const [hasError, setHasError] = useState(false);
  const allProducts = useSelector((state) => state.products);
  const [product, setProduct] = useState(productModel);
  const [quantity, setQuantity] = useState(1);
  const [displayedProduct, setDisplayedProduct] = useState(product.images[0]);
  const dispatch = useDispatch();

  let params = useParams();

  const handleAddToCart = () => {
    if (product.option_groups && product.option_groups[0]) {
      if (size === "Choose a size") {
        setHasError(true);
        return;
      }
      // dispatch(addToCart(product.id, quantity));
      setHasError(false);
    } else {
      // dispatch(addToCart(product.id, quantity));
      setHasError(false);
    }
    setQuantity(1);
    setSize("Choose a size");
  };

  useEffect(() => {
		const data = allProducts.filter((product) => {
			return product.id === params.id;
		});

		console.log('data: ', data);

		if (data.length) {
			setProduct(data[0]);
		}
		
    if (window.scrollY !== 0) {
      window.scrollTo(0, 0);
    }
  }, [params]);

  const sizeOptions = product?.option_groups[0]
    ? [
        <MenuItem value={"Choose a size"} disabled>
          Choose a size
        </MenuItem>,
        ...product?.option_groups[0].sizes.map((option) => (
          <MenuItem key={option.id} value={option}>
            {option.name}
          </MenuItem>
        )),
      ]
    : null;

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
              {!displayedProduct ? (
                <CircularProgress size={80} />
              ) : (
                <Fade
                  in={displayedProduct !== null}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(displayedProduct !== null ? { timeout: 1000 } : {})}
                >
                  <img
                    className="product-detail-image"
                    src={displayedProduct}
                    alt={product.name}
                  />
                </Fade>
              )}
            </div>

            <div style={{ display: "flex", margin: "10px 0" }}>
              {product.images.map((imageObj) => (
                <div
                  key={imageObj.id}
                  onClick={(e) => setDisplayedProduct(e.target.src)}
                  className="thumbnail-container"
                >
                  <img
                    key={imageObj.id}
                    style={{
                      height: "50px",
                      width: "40px",
                      margin: "10px",
                      cursor: "pointer",
                      borderRadius: "0.2rem",
                    }}
                    src={imageObj.url}
                    alt="hoodie"
                  />
                </div>
              ))}
            </div>

            <Typography className="product-details-text">
              {product.name}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Typography>
          </div>
          {/* Right Section */}
          <div className="right-section">
            <Typography className="price-header">
              {product.price.formatted_with_symbol}
            </Typography>
            {/* {
							<Typography className="color-header">
							Color: Default
						</Typography>
						} */}
            {sizeOptions && (
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
                className="quantity-button"
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </Button>
              <Typography>{quantity}</Typography>
              <Button
                className="quantity-button"
                onClick={() => setQuantity(quantity + 1)}
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
