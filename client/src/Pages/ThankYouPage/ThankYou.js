import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ThankYou.scss";
import { _fetchPaymentStatus } from "../../api/stripeRequests";

const ThankYou = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const Navigate = useNavigate();

  // For demonstration, assume you stored the newly created order in Redux
  const orders = useSelector((state) => state.user.orders);

  // If no orders in Redux, check local storage (guest users)
  const lastOrder = useMemo(() => {
    if (orders?.length > 0) {
      return orders[orders.length - 1]; // Authenticated user order
    }

    // Check local storage for guest orders
    const guestOrders = JSON.parse(localStorage.getItem("guestOrders")) || [];
    return guestOrders.length > 0 ? guestOrders[guestOrders.length - 1] : null;
  }, [orders]);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    console.log("sessionId: ", sessionId);

    _fetchPaymentStatus(sessionId).then((data) => {
      console.log("line_items: ", data.line_items);
      setStatus(data.status);
      setCustomerEmail(data.customer_email);
    });
  }, []);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  // Destructure lastOrder safely
  const { id, items, total } = lastOrder || {};

  if (status === "complete") {
    return (
      <div className="thank-you-container">
        <h1 id="thank-you-header">Thank You For Your Order!</h1>
        <p>Your order was successfully placed.</p>

        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <strong>Order ID:</strong> {id || "N/A"}
        </div>

        <h2 id="order-summary-header">Order Summary</h2>
        <ul>
          {items?.map((item) => (
            <li key={item.id} style={{ marginBottom: "0.5rem" }}>
              {item.name} <br />
              Quantity: {item.quantity?.toFixed(2)} <br />
              Price: ${item.price?.toFixed(2)} each
            </li>
          ))}
        </ul>
        <p>
          <strong>Total:</strong> ${total || "N/A"}
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
