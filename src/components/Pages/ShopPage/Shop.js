import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router-dom";
import { Container, Typography, Fade } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useStyles } from "./shopStyles.js";
import { useShopify } from "../../../redux/ducks/shopify/index";
import Product from "../../ProductComponents/Product/Product.js";

export default function Shop() {
  const classes = useStyles();
  // const allProducts = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);
  const shopify = useShopify();

  if (window.scrollY !== 0) {
    window.scrollTo(0, 0);
  }

  let params = useParams();

  const headerName = params.category
    .split("-")
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(" ");

  useEffect(() => {
    shopify.client.product.fetchAll().then((storeProducts) => {
      if (!storeProducts.length) {
        setProducts([]);
      } else {
        setProducts(storeProducts);
      }
    });
  }, []);

  return (
    <div className={classes.shopContainer}>
      <div className={classes.shopHeader}>
        <Container maxWidth="sm">
          <Typography
            variant="h2"
            align="center"
            color="textPrimary"
            className={classes.header}
            gutterBottom
          >
            {headerName}
          </Typography>
        </Container>
      </div>

      <Container className={classes.cardGrid} maxWidth="xl">
        <Grid container spacing={4}>
          {products.map((product) => (
            <>
              <Fade
                key={product.id}
                in={product !== null}
                style={{ transformOrigin: "0 0 0" }}
                {...(product !== null ? { timeout: 1500 } : {})}
              >
                <Grid
                  className={classes.gridItem}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                  xl={3}
                >
                  <Product product={product} className={classes.card} />
                </Grid>
              </Fade>
            </>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
