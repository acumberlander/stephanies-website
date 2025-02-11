import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, Button, Divider } from "@mui/material";
import { emptyCart } from "../../store/cartThunks/cartThunks";
import { Link } from "react-router-dom";

import CartItem from "../../components/CartComponents/CartItem/CartItem";
import { GROUND_SHIPPING } from "../../constants/constants";
import "./Cart.scss";

const Cart = () => {
  const { uid } = useSelector((state) => state.user);
  const { subtotal, cart_items } = useSelector((state) => state.user.cart);
  const dispatch = useDispatch();

  if (window.scrollY !== 0) {
    window.scrollTo(0, 0);
  }

  const handleEmptyCart = () => {
    dispatch(emptyCart(uid));
  };

  const calculateTax = () => {
    return subtotal * 0.0975;
  };

  const calculateTotal = () => {
    return calculateTax() + subtotal + GROUND_SHIPPING;
  };

  const EmptyCart = () => (
    <div className="empty-cart-container">
      <Typography className="empty-text">
        You have no items in your shopping cart,{" "}
        <Link to="/shop/all-products" className="link">
          start adding some
        </Link>
        !
      </Typography>
    </div>
  );

  const FilledCart = () => (
    <div className="cart-items-container">
      <div className="toolbar" />
      <Typography className="title" variant="h6">
        My Cart
      </Typography>
      <Divider className="divider" />
      <div>
        {cart_items.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>
      <div className="empty-button-container">
        <Button
          className="empty-button"
          size="large"
          type="button"
          variant="contained"
          color="secondary"
          onClick={handleEmptyCart}
        >
          Empty Cart
        </Button>
      </div>
    </div>
  );

  const OrderSummary = () => (
    <div className="order-summary-container">
      <div className="toolbar" />
      <Typography className="title" variant="h6">
        Order Summary
      </Typography>
      <Divider className="divider" />
      <div className="subtotal-container">
        <Typography>Subtotal</Typography>
        <Typography>{subtotal.toFixed(2)}</Typography>
      </div>
      <div className="shipping-container">
        <Typography>Shipping</Typography>
        <Typography>5.00</Typography>
      </div>
      <div className="tax-container">
        <Typography>Tax (9.75%)</Typography>
        <Typography>{calculateTax().toFixed(2)}</Typography>
      </div>
      <Divider className="divider" />
      <div className="total-container">
        <Typography>Total</Typography>
        <Typography>{calculateTotal().toFixed(2)}</Typography>
      </div>
      <div className="checkout-button-container">
        <Button
          component={Link}
          to="/checkout"
          className="checkout-button"
          size="large"
          type="button"
          variant="contained"
        >
          Checkout
        </Button>
      </div>
    </div>
  );

  return (
    <Container className="cart-container">
      {!cart_items.length ? (
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
