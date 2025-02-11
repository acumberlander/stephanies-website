import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { createOrder } from "../../store/userThunks/userThunks";
import "./ThankYou.scss";

const ThankYou = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.user.orders);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sessionId = urlParams.get("session_id");
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionId && user.uid) {
      dispatch(createOrder(sessionId))
        .unwrap()
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("There was a problem creating your order... ", error);
        });
    }
  }, [sessionId, dispatch, user.uid]);

  const lastOrderMemoized = useMemo(() => {
    return orders.length > 0 ? orders[orders.length - 1] : null;
  }, [orders]);

  return (
    <div className="thank-you-container">
      {isLoading ? (
        <CircularProgress size={80} />
      ) : (
        <>
          <h1 id="thank-you-header">Thank You For Your Order!</h1>
          <p>Your order was successfully placed.</p>

          <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <strong>Order ID:</strong> {sessionId}
          </div>

          <h2 id="order-summary-header">Order Summary</h2>
          <ul>
            {lastOrderMemoized !== null
              ? lastOrderMemoized.items?.map((item) => (
                  <li key={item.id} style={{ marginBottom: "0.5rem" }}>
                    {item.name} <br />
                    Quantity: {item.quantity} <br />
                    Price: ${item.price} each
                  </li>
                ))
              : null}
          </ul>
          {lastOrderMemoized !== null ? (
            <p>
              <strong>Total:</strong> ${lastOrderMemoized.total}
            </p>
          ) : null}

          <p style={{ marginTop: "2rem" }}>
            We appreciate your business and hope to serve you again soon!
          </p>
        </>
      )}
    </div>
  );
};

export default ThankYou;
