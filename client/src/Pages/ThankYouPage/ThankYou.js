import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ThankYou.scss";
import {
  _fetchPaymentStatus,
  _fetchSessionLineItems,
} from "../../api/stripeRequests";
import { _createOrder } from "../../api/mongoRequests";

const ThankYou = () => {
  const [status, setStatus] = useState(null);
  const [order, setOrder] = useState(null);
  const { uid } = useSelector((state) => state.user);
  const { subtotal } = useSelector((state) => state.user.cart);
  const Navigate = useNavigate();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    _fetchPaymentStatus(sessionId).then((data) => {
      setStatus(data.status);
    });
    if (uid !== null && subtotal !== 0) {
      _createOrder(sessionId, uid, subtotal).then((data) => {
        setOrder(data);
      });
    }
  }, [subtotal, uid]);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  // Destructure lastOrder safely
  const { sessionId, cart_items, total } = order || {};

  if (status === "complete") {
    return (
      <div className="thank-you-container">
        <h1 id="thank-you-header">Thank You For Your Order!</h1>
        <p>Your order was successfully placed.</p>

        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <strong>Order ID:</strong> {sessionId || "N/A"}
        </div>

        <h2 id="order-summary-header">Order Summary</h2>
        <ul>
          {cart_items?.map((item) => (
            <li key={item.id} style={{ marginBottom: "0.5rem" }}>
              {item.name} <br />
              Quantity: {item.quantity} <br />
              Price: ${(item.price / 100)?.toFixed(2)} each
            </li>
          ))}
        </ul>
        <p>
          <strong>Total:</strong> ${total?.toFixed(2) || "N/A"}
        </p>

        <p style={{ marginTop: "2rem" }}>
          We appreciate your business and hope to serve you again soon!
        </p>
      </div>
    );
  }

  return null;
};

export default ThankYou;
