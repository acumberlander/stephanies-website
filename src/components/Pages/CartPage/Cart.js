import React from "react";
import { Container, Typography, Button, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";

import useStyles from "./cartStyles";
import CartItem from "../../CartComponents/CartItem/CartItem";
import { useSelector, useDispatch } from "react-redux";
import { useShopify } from "../../../hooks/index";
import { SettingsCellOutlined } from "@material-ui/icons";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const classes = useStyles();
  const { checkoutState, setCount } = useShopify();

  if (window.scrollY !== 0) {
    window.scrollTo(0, 0);
  }

  const handleEmptyCart = () => {
    setCount(0);
  };

  const EmptyCart = () => (
    <div className={classes.emptyCartContainer}>
      <Typography className={classes.emptyText}>
        You have no items in your shopping cart,{" "}
        <Link to="/shop/all-products" className={classes.link}>
          start adding some
        </Link>
        !
      </Typography>
    </div>
  );

  const FilledCart = () => (
    <div className={classes.cartItemsContainer}>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h6">
        My Cart
      </Typography>
      <Divider className={classes.divider} />
      <div>
        {checkoutState.lineItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className={classes.emptyButtonContainer}>
        <Button
          className={classes.emptyButton}
          size="large"
          type="button"
          variant="contained"
          color="secondary"
          href="/cart/clear"
        >
          Empty Cart
        </Button>
        {/* <a href="/cart" class="btn clear-cart">
          Empty Cart
        </a> */}
      </div>
    </div>
  );

  const OrderSummary = () => (
    <div className={classes.orderSummaryContainer}>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h6">
        Order Summary
      </Typography>
      <Divider className={classes.divider} />
      <div className={classes.subtotalContainer}>
        <Typography>Subtotal</Typography>
        <Typography>${checkoutState.subtotalPrice}</Typography>
      </div>
      <Typography>Estimate Shipping</Typography>
      <Divider className={classes.divider} />
      <div className={classes.totalContainer}>
        <Typography>Total</Typography>
        {/* TODO Need to add logic that accounts for shipping and other costs/discounts (taxes or discount codes) */}
        <Typography>${checkoutState.subtotalPrice}</Typography>
      </div>
      <div className={classes.checkoutButtonContainer}>
        <Button
          component={Link}
          to="/checkout"
          className={classes.checkoutButton}
          size="large"
          type="button"
          variant="contained"
        >
          Checkout
        </Button>
      </div>
    </div>
  );

  if (!checkoutState.lineItems) return "Loading...";

  return (
    <Container className={classes.cartContainer}>
      {!checkoutState.lineItems.length ? (
        <EmptyCart />
      ) : (
        <>
          <FilledCart />
          <OrderSummary />
        </>
      )}
    </Container>
  );
};

export default Cart;
