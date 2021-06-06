import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStyles } from "./productDetailsStyles";
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
} from "@material-ui/core";
import Client from "shopify-buy";
import { useDispatch } from "react-redux";
import PinterestIcon from "@material-ui/icons/Pinterest";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import productModel from "../../../Models/Product";
import ProductDetailsDropdowns from "../../ProductComponents/ProductDetailsDropdowns/ProductDetailsDropdowns";
import { useShopify } from "../../../redux/ducks/shopify/index";

const client = Client.buildClient({
  storefrontAccessToken: "dd4d4dc146542ba7763305d71d1b3d38",
  domain: "graphql.myshopify.com",
});

const ProductDetails = () => {
  const [size, setSize] = useState("Choose a size");
  const [hasError, setHasError] = useState(false);
  const [product, setProduct] = useState(productModel);
  const [quantity, setQuantity] = useState(1);
  const [displayedProduct, setDisplayedProduct] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();

  const { fetchProduct } = useShopify();

  let params = useParams();

  // const fetchProductById = async (id) => {
  //   const data = await client.product.fetch(id);

  //   setProduct(data);
  //   setDisplayedProduct(data.images[0].src);
  // };

  const handleAddToCart = () => {
    if (product.variants[0]) {
      if (size === "Choose a size") {
        setHasError(true);
        return;
      }
      const { id } = product.variants[0];
      //   dispatch(addToCart(product.id, quantity, { [id]: size.id }));
      setHasError(false);
    } else {
      //   dispatch(addToCart(product.id, quantity));
      setHasError(false);
    }
    setQuantity(1);
    setSize("Choose a size");
  };

  useEffect(() => {
    fetchProduct(params.id).then((currentProduct) => {
      setProduct(currentProduct);
      setDisplayedProduct(currentProduct.images[0].src);
    });
    if (window.scrollY !== 0) {
      window.scrollTo(0, 0);
    }
  }, [params]);

  const sizeOptions = product.variants[0]
    ? //[
      // <MenuItem value={"Choose a size"} disabled>
      //   Choose a size
      // </MenuItem>,
      // ...product.variants[0].selectedOptions[1].map((option) => (
      //   <MenuItem key={option.id} value={option}>
      //     {option.name}
      //   </MenuItem>
      // )),
      product.variants &&
      product.variants.map((item, i) => {
        return (
          <option
            value={item.id.toString()}
            key={item.title + i}
          >{`${item.title}`}</option>
        );
      })
    : //]
      null;

  return (
    <Container className={classes.container}>
      <div className={classes.contentContainer}>
        <div className={classes.productAndDetails}>
          {/* Left Section */}
          <div className={classes.leftSection}>
            <Typography className={classes.productName} variant="h5">
              {product.title}
            </Typography>
            <div className={classes.displayContainer}>
              {!displayedProduct ? (
                <CircularProgress size={80} />
              ) : (
                <Fade
                  in={displayedProduct !== null}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(displayedProduct !== null ? { timeout: 1000 } : {})}
                >
                  <img
                    className={classes.productImage}
                    src={displayedProduct}
                    alt={product.title}
                  />
                </Fade>
              )}
            </div>

            <div style={{ display: "flex", margin: "10px 0" }}>
              {product.images.map((imageObj) => (
                <div
                  key={imageObj.id}
                  onClick={(e) => setDisplayedProduct(e.target.src)}
                  className={classes.thumbnailContainer}
                >
                  <img
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

            <Typography className={classes.productDetailsText}>
              {product.title}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Typography>
          </div>
          {/* Right Section */}
          <div className={classes.rightSection}>
            <Typography className={classes.priceHeader}>
              {product.variants[0].price}
            </Typography>
            {/* {
							<Typography className={classes.colorHeader}>
							Color: Default
						</Typography>
						} */}
            {sizeOptions && (
              <>
                <Typography className={classes.sizeHeader}>Size</Typography>
                <FormControl required error={hasError}>
                  <Select
                    className={classes.sizeSelection}
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

            <Typography className={classes.quantityHeader}>Quantity</Typography>

            <div className={classes.quantityContainer}>
              <Button
                className={classes.quantityButton}
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </Button>
              <Typography>{quantity}</Typography>
              <Button
                className={classes.quantityButton}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
            <br />

            <Button
              variant="contained"
              className={classes.button}
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>

            <div className={classes.accordionContainer}>
              <ProductDetailsDropdowns />
            </div>

            <div className={classes.socialMediaGroup}>
              <PinterestIcon className={classes.socialIcon} />
              <FacebookIcon className={classes.socialIcon} />
              <TwitterIcon className={classes.socialIcon} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
