import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../../store/cartThunks/cartThunks";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Fade,
} from "@mui/material";
import PinterestIcon from "@mui/icons-material/Pinterest";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import ProductDetailsDropdowns from "../../components/ProductComponents/ProductDetailsDropdowns/ProductDetailsDropdowns";
import productModel from "../../Models/Product";
import { motion } from "framer-motion";

import "./ProductDetails.scss";

const ProductDetails = () => {
  const [product, setProduct] = useState(productModel);
  const [displayedImage, setDisplayedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const allProducts = useSelector((state) => state.products);
  const { uid } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let params = useParams();

  /**
   * Adds current product to the users cart. Updates the user state in redux
   */
  const handleAddToCart = () => {
    dispatch(addToCart({ uid, product, quantity }));
    setQuantity(1);
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
  }, [params, allProducts, dispatch]);

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
                <CircularProgress size={80} sx={{ color: "#cc34ab" }} />
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
              {product.images.map((imageObj, i) => (
                <motion.div
                  key={imageObj + i}
                  onClick={() => setDisplayedImage(imageObj)}
                  className="thumbnail-container"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    className="images-list"
                    src={imageObj}
                    alt={product.name}
                    style={{
                      border:
                        displayedImage === imageObj
                          ? "1px solid #cc34ab"
                          : "1px solid transparent",
                      borderRadius: "4px",
                      padding: "2px",
                    }}
                  />
                </motion.div>
              ))}
            </div>

            <Typography className="product-details-text">
              {product.description}
            </Typography>
          </div>
          {/* Right Section */}
          <div className="right-section">
            <Typography className="price-header">${product.price}</Typography>

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
