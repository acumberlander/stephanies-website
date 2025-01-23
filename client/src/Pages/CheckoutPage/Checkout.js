import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../store/userThunks/userThunks";
import { useNavigate } from "react-router-dom";
import { ShippingInfo } from "./CheckoutSteps/ShippingInfo";
import { PaymentInfo } from "./CheckoutSteps/PaymentInfo";
import { OrderReview } from "./CheckoutSteps/OrderReview";
import { Button } from "@mui/material";
import { defaultValues } from "./formValues";
import "./Checkout.scss";

function CheckoutPage() {
  const cartItems = useSelector((state) => state.user.cart.cart_items);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ defaultValues });

  // TODO: Integrate api that determines the sales tax based the zip code
  const TAX_RATE = 0.095; // 9.5% tax
  const SHIPPING_FEE = 8.0;

  // Compute cart subtotal, tax, total in a memo
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

  const onSubmit = async (data) => {
    if (step < 3) {
      // Move to next step
      setStep(step + 1);
      return;
    }
    const timestamp = new Date();
    const serializedTimestamp = timestamp.toISOString();

    try {
      // Prepare order data
      const orderData = {
        id: crypto.randomUUID(),
        createdAt: serializedTimestamp,
        shippingInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          city: data.city,
          state: data.state,
          zip: data.zip,
          phone: data.phone,
          email: data.email,
        },
        // TODO: Integrate payment api (stripe, paypal, etc)
        paymentInfo: {
          cardName: data.cardName,
          cardNumber: data.cardNumber,
          cardExpirationMonth: data.cardExpirationMonth,
          cardExpirationYear: data.cardExpirationYear,
          cvc: data.cvc,
        },
        items: cartItems,
        subtotal,
        taxAmount,
        shippingFee: SHIPPING_FEE,
        total: total.toFixed(2),
      };
      dispatch(createOrder(orderData));
      navigate("/thank-you");
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error processing your order.");
    }
  };

  return (
    <div className="checkout-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && <ShippingInfo errors={errors} register={register} />}
        {step === 2 && <PaymentInfo errors={errors} register={register} />}
        {step === 3 && (
          <OrderReview
            register={register}
            errors={errors}
            cartItems={cartItems}
            subtotal={subtotal}
            shippingFee={SHIPPING_FEE}
            taxAmount={taxAmount}
            total={total}
          />
        )}

        <div className="button-group" style={{ marginTop: "1rem" }}>
          {step > 1 && (
            <Button
              className="button"
              type="button"
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          )}
          <Button className="button" type="submit">
            {step < 3 ? "Next" : "Place Order"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutPage;
