import React from "react";
import { Typography, Button, Container } from "@mui/material";
import {
  incrementProductQuantity,
  decrementProductQuantity,
  removeProductFromCart,
} from "../../../store/cartThunks/cartThunks";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./CartItem.scss";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.user);
  const handleRemoveProduct = () => {
    dispatch(removeProductFromCart(product));
  };

  return (
    <Container className="cart-item-container">
      <div className="image-and-description">
        <Link className="product-link" to={`/product/${product.id}`}>
          <img src={product.images[0]} alt="hoodie" className="cart-item" />
        </Link>
        <div>
          <Link className="product-link" to={`/product/${product.id}`}>
            <Typography variant="h6" className="cart-product-name">
              {product.name}
            </Typography>
          </Link>
          {/* TODO: Implement feature for product selected size*/}
          {/* {product.selected_size && (
						<Typography>{`Size: ${product.selected_size}`}</Typography>
					)} */}
          <div className="buttons">
            <Button
              disabled={product.quantity < 2}
              type="button"
              size="small"
              onClick={() => dispatch(decrementProductQuantity(product))}
            >
              -
            </Button>
            <Typography>{product.quantity}</Typography>
            <Button
              type="button"
              size="small"
              onClick={() => dispatch(incrementProductQuantity(product))}
            >
              +
            </Button>
          </div>
        </div>
      </div>
      <div className="price-and-remove">
        {/* TODO need to apply logic to account for dynamic change amount (money) */}
        <Typography>{`$${product.price * product.quantity}`}</Typography>
        <Button type="button" color="secondary" onClick={handleRemoveProduct}>
          X
        </Button>
      </div>
    </Container>
  );
};

export default CartItem;
