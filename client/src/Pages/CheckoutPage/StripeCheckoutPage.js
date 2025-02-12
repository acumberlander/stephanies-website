import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { config } from "dotenv";

import { loadStripe } from "@stripe/stripe-js";

import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

import "./Checkout.scss";
import { _createStripeCheckoutSession } from "../../api/stripeRequests";

config();

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_API_KEY);

const CheckoutPage = ({ isMobile }) => {
  const cartItems = useSelector((state) => state.user.cart.cart_items);
  const uid = useSelector((state) => state.user.uid);
  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    const data = await _createStripeCheckoutSession(cartItems, uid);
    return data.clientSecret;
  }, [cartItems]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutPage;
