import React from "react";
import { Typography, Button, Container } from "@material-ui/core";
import { useShopify } from "../../../hooks/index";
import { Link } from "react-router-dom";

import useStyles from "./cartItemStyles";

const CartItem = ({ item }) => {
  const classes = useStyles();

  const { checkoutState, updateQuantity, removeLineItem, setCount, cartCount } =
    useShopify();

  const decrementQuantity = (lineItemId, lineItemQuantity, e) => {
    e.preventDefault();
    const checkoutId = checkoutState.id;
    const updatedQuantity = lineItemQuantity - 1;
    updateQuantity(lineItemId, updatedQuantity, checkoutId);
    setCount(cartCount - 1);
  };

  const incrementQuantity = (lineItemId, lineItemQuantity, e) => {
    e.preventDefault();
    const checkoutId = checkoutState.id;
    const updatedQuantity = lineItemQuantity + 1;
    updateQuantity(lineItemId, updatedQuantity, checkoutId);
    setCount(cartCount + 1);
  };

  const deleteLineItem = (itemQuantity, lineItemId, e) => {
    e.preventDefault();
    const checkoutId = checkoutState.id;
    removeLineItem(checkoutId, lineItemId);
    setCount(cartCount - itemQuantity);
  };
  return (
    <Container className={classes.container}>
      <div className={classes.imageAndDescription}>
        <Link className={classes.shopLink} to={`/product/${item.id}`}>
          <img
            src={item.variant.image.src}
            alt="hoodie"
            className={classes.media}
          />
        </Link>
        <div>
          <Link className={classes.shopLink} to={`/product/${item.id}`}>
            <Typography variant="h6" className={classes.productName}>
              {item.title}
            </Typography>
          </Link>
          {item.variant && (
            <Typography>{`Size: ${item.variant.title}`}</Typography>
          )}
          <div className={classes.buttons}>
            <Button
              type="button"
              size="small"
              onClick={(e) => decrementQuantity(item.id, item.quantity, e)}
            >
              -
            </Button>
            <Typography>{item.quantity}</Typography>
            <Button
              type="button"
              size="small"
              onClick={(e) => incrementQuantity(item.id, item.quantity, e)}
            >
              +
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.priceAndRemove}>
        {/* TODO need to apply logic to account for dynamic change amount (money) */}
        <Typography>{`$${
          parseInt(item.variant.price) * item.quantity
        }`}</Typography>
        <Button
          type="button"
          color="secondary"
          onClick={(e) => deleteLineItem(item.quantity, item.id, e)}
        >
          X
        </Button>
      </div>
    </Container>
  );
};

export default CartItem;
