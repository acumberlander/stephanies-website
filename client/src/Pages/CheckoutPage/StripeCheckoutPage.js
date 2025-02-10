import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";

import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

import "./Checkout.scss";
import { _stripeCheckout } from "../../api/stripeRequests";

const stripePromise = loadStripe(
  "pk_test_51IXc8UGZ9VpDdAnjJiDCqNr2ZPX3juuFegGBPhKzMZuBpYHm8MW74hE2gbGPR89LttRRd98zXmOSgbyjcbiqOasb00lMKjHDhN"
);

const CheckoutPage = ({ isMobile }) => {
  const cartItems = useSelector((state) => state.user.cart.cart_items);
  const uid = useSelector((state) => state.user.uid);
  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    const data = await _stripeCheckout(cartItems, uid);
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
