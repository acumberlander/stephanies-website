import { useState } from "react";
import { ShippingInfo } from "./CheckoutSteps/ShippingInfo";
import { PaymentInfo } from "./CheckoutSteps/PaymentInfo";
import { OrderReview } from "./CheckoutSteps/OrderReview";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { _stripeCheckout } from "../../api/stripeRequests";

export const CheckoutForm = ({
  cartItems,
  subtotal,
  taxAmount,
  shippingFee,
  total,
  step,
  setStep,
  register,
  errors,
  isMobile,
  navigate,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);

  const { handleSubmit } = useForm();

  const fetchPaymentIntent = async () => {
    try {
      const data = await _stripeCheckout(cartItems);
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Error fetching payment intent:", error);
    }
  };

  useState(() => {
    fetchPaymentIntent();
  }, []);

  const onSubmit = async (data) => {
    if (step < 2) {
      setStep(step + 1);
      return;
    }

    if (!stripe || !elements) return;

    setLoading(true);
    try {
      const cardElement = elements.getElement(CardElement);
      console.log("data: ", data);
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: data.firstName + " " + data.lastName,
              email: data.email,
              address: {
                line1: data.addressLine1,
                city: data.city,
                state: data.state,
                postal_code: data.zip,
              },
            },
          },
        }
      );

      if (error) {
        console.error("Payment error:", error);
        toast("Payment failed. Try again.");
        setLoading(false);
        return;
      }

      toast("Payment successful!");
      navigate("/thank-you");
    } catch (error) {
      console.error("Error processing order:", error);
      toast("There was an error processing your order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {step === 1 && <ShippingInfo errors={errors} register={register} />}
      {step === 2 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "550px",
            border: "1px solid red",
            padding: "5px",
          }}
        >
          <div style={{ width: "200px" }} className="form-group">
            <h2>Card Details</h2>
            <CardElement style={{ width: "350px" }} className="card-element" />
          </div>
          <OrderReview
            register={register}
            errors={errors}
            cartItems={cartItems}
            subtotal={subtotal}
            shippingFee={shippingFee}
            taxAmount={taxAmount}
            total={total}
          />
        </div>
      )}

      <div
        className="button-group"
        style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}
      >
        {step > 1 && (
          <Button
            className="button"
            type="button"
            onClick={() => setStep(step - 1)}
          >
            Back
          </Button>
        )}
        <Button className="button" type="submit" disabled={loading}>
          {step < 2 ? "Next" : loading ? "Processing..." : "Place Order"}
        </Button>
      </div>
    </form>
  );
};
