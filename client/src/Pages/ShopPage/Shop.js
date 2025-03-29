import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { useParams } from "react-router-dom";
import { CircularProgress, Container, Typography, Fade } from "@mui/material";
import { useSelector } from "react-redux";
import Product from "../../components/ProductComponents/Product/Product.js";
import "./Shop.scss";
import ErrorPage from "../ErrorPage/ErrorPage.js";

export default function Shop() {
  const allProducts = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  if (window.scrollY !== 0) {
    window.scrollTo(0, 0);
  }

  let params = useParams();

  const headerName = params.category
    .split("-")
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(" ");

  useEffect(() => {
    if (allProducts.status === "failed") {
      setIsLoading(false);
      setError(allProducts.error);
    }

    if (allProducts.status === "succeeded") {
      setIsLoading(false);

      const data = allProducts.items.filter((product) => {
        return params.category.includes(product.category);
      });

      if (!data.length) {
        setProducts(allProducts.items);
      } else {
        setProducts(data);
      }
    }
  }, [allProducts, params]);

  return (
    <div className="shop-container">
      <div className="shop-header">
        <Container maxWidth="sm">
          <Typography
            variant="h2"
            align="center"
            color="textPrimary"
            className="header"
            gutterBottom
          >
            {headerName}
          </Typography>
        </Container>
      </div>
      {isLoading ? (
        <div className="page-loading">
          <CircularProgress size={80} />
        </div>
      ) : products.length > 0 && !error ? (
        <Grid className="card-grid" container spacing={4}>
          {products?.map((product) => (
            <Fade
              key={product.id}
              in={product !== null}
              style={{ transformOrigin: "0 0 0" }}
              {...(product !== null ? { timeout: 1500 } : {})}
            >
              <Grid className="grid-item" xs={12} sm={6} md={4} lg={4} xl={3}>
                <Product product={product} className="card" />
              </Grid>
            </Fade>
          ))}
        </Grid>
      ) : (
        <ErrorPage error={error} />
      )}
    </div>
  );
}
