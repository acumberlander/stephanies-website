import React from "react";
import { Typography, Button, Container } from "@material-ui/core";
import { useShopify } from "../../../hooks/index";
import { Link } from "react-router-dom";

import useStyles from "./cartItemStyles";

const CartItem = ({ item }) => {
  const classes = useStyles();

  const { checkoutState, updateQuantity, removeLineItem } = useShopify();

  const decrementQuantity = (lineItemId, lineItemQuantity, e) => {
    e.preventDefault();
    const checkoutId = checkoutState.id;
    const updatedQuantity = lineItemQuantity - 1;
    updateQuantity(lineItemId, updatedQuantity, checkoutId);
  };

  const incrementQuantity = (lineItemId, lineItemQuantity, e) => {
    e.preventDefault();
    const checkoutId = checkoutState.id;
    const updatedQuantity = lineItemQuantity + 1;
    updateQuantity(lineItemId, updatedQuantity, checkoutId);
  };

  const deleteLineItem = (lineItemId, e) => {
    e.preventDefault();
    const checkoutId = checkoutState.id;
    removeLineItem(checkoutId, lineItemId);
  };
  return (
    <Container className={classes.container}>
      <div className={classes.imageAndDescription}>
        <Link className={classes.shopLink} to={`/product/${item.product_id}`}>
          <img src={item.media.source} alt="hoodie" className={classes.media} />
        </Link>
        <div>
          <Link className={classes.shopLink} to={`/product/${item.product_id}`}>
            <Typography variant="h6" className={classes.productName}>
              {item.name}
            </Typography>
          </Link>
          {item.selected_options[0] && (
            <Typography>{`Size: ${item.selected_options[0].option_name}`}</Typography>
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
        <Typography>{`$${item.price.raw * item.quantity}.00`}</Typography>
        <Button
          type="button"
          color="secondary"
          onClick={(e) => deleteLineItem(item.id, e)}
        >
          X
        </Button>
      </div>
    </Container>
  );
};

export default CartItem;
