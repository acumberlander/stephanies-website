import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { emptyCart } from "../../store/cartThunks/cartThunks";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartComponents/CartItem/CartItem";
import { copyToClipboard } from "../../helpers/helpers";
import { formatStripeAmount } from "../../utils/formatFunctions/formatStripeAmounts";
import { _fetchShippingRate, _fetchTaxRate } from "../../api/stripeRequests";
import "./Cart.scss";

const Cart = () => {
  const { subtotal, cart_items } = useSelector((state) => state.user.cart);
  const dispatch = useDispatch();
  const [taxRate, setTaxRate] = useState(null);
  const [shippingRate, setShippingRate] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRates = useCallback(async () => {
    try {
      const [tax, shipping] = await Promise.all([
        _fetchTaxRate(),
        _fetchShippingRate(),
      ]);
      setTaxRate(tax.percentage);
      setShippingRate(shipping.fixed_amount.amount);
    } catch (error) {
      console.error("Error fetching tax/shipping rates:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (window.scrollY !== 0) window.scrollTo(0, 0);
    fetchRates();
  }, [fetchRates]);

  const handleEmptyCart = () => dispatch(emptyCart());

  const calculateTotal = () => {
    if (taxRate === null || shippingRate === null) return 0;
    const taxAmount = (subtotal * taxRate) / 100;
    return subtotal + taxAmount + shippingRate;
  };

  if (loading) {
    return (
      <Container
        className="cart-container"
        sx={{ textAlign: "center", mt: 10 }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (!cart_items.length) {
    return (
      <Container className="cart-container">
        <div className="empty-cart-container">
          <Typography className="empty-text">
            You have no items in your shopping cart,{" "}
            <Link to="/shop/all-products" className="link">
              start adding some
            </Link>
            !
          </Typography>
        </div>
      </Container>
    );
  }

  return (
    <Container className="cart-container">
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
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
        </div>
      </div>

      <div className="order-summary-container">
        <div className="toolbar" />
        <Typography className="title" variant="h6">
          Order Summary
        </Typography>
        <Divider className="divider" />
        <div className="subtotal-container">
          <Typography>Subtotal</Typography>
          <Typography>{formatStripeAmount(subtotal)}</Typography>
        </div>
        <div className="tax-container">
          <Typography>Tax</Typography>
          <Typography>
            {formatStripeAmount((subtotal * taxRate) / 100)}
          </Typography>
        </div>
        <div className="shipping-container">
          <Typography>Shipping</Typography>
          <Typography>{formatStripeAmount(shippingRate)}</Typography>
        </div>
        <Divider className="divider" />
        <div className="total-container">
          <Typography>Total</Typography>
          <Typography>{formatStripeAmount(calculateTotal())}</Typography>
        </div>
        <div className="checkout-button-container">
          <Button
            component={Link}
            to="/checkout"
            className="checkout-button"
            size="large"
            variant="contained"
            onClick={copyToClipboard}
          >
            Checkout
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
