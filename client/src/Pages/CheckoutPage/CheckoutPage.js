import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { config } from "dotenv";

import { loadStripe } from "@stripe/stripe-js";

import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

import { _createStripeCheckoutSession } from "../../api/stripeRequests";
import "./CheckoutPage.scss";

config();

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_API_KEY);

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.user.cart.cart_items);
  const uid = useSelector((state) => state.user.uid);
  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    const data = await _createStripeCheckoutSession(cartItems, uid);
    return data.clientSecret;
  }, [cartItems]);

  const options = { fetchClientSecret };
  const navigate = useNavigate();

  useEffect(() => {
    if (uid === null) {
      navigate("/");
    }
  }, [uid]);

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutPage;
