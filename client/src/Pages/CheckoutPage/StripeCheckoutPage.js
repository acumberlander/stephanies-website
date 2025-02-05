import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./CheckoutForm";

import "./Checkout.scss";

const stripePromise = loadStripe(
  "pk_test_51IXc8UGZ9VpDdAnjJiDCqNr2ZPX3juuFegGBPhKzMZuBpYHm8MW74hE2gbGPR89LttRRd98zXmOSgbyjcbiqOasb00lMKjHDhN"
);

const CheckoutPage = ({ isMobile }) => {
  const cartItems = useSelector((state) => state.user.cart.cart_items);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
  } = useForm();

  const TAX_RATE = 0.095; // 9.5% tax
  const SHIPPING_FEE = 8.0;

  const { subtotal, taxAmount, total } = useMemo(() => {
    const sum = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const tax = sum * TAX_RATE;
    return {
      subtotal: sum.toFixed(2),
      taxAmount: tax.toFixed(2),
      total: sum + tax + SHIPPING_FEE,
    };
  }, [cartItems]);

  return (
    <Elements stripe={stripePromise}>
      <div className="checkout-container">
        <CheckoutForm
          cartItems={cartItems}
          subtotal={subtotal}
          taxAmount={taxAmount}
          shippingFee={SHIPPING_FEE}
          total={total}
          step={step}
          setStep={setStep}
          register={register}
          errors={errors}
          isMobile={isMobile}
          navigate={navigate}
        />
      </div>
    </Elements>
  );
};

export default CheckoutPage;
