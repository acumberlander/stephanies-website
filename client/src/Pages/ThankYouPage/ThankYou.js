import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import "./ThankYou.scss";

const ThankYou = () => {
  // For demonstration, assume you stored the newly created order in Redux
  const orders = useSelector((state) => state.user.orders);
  const lastOrder = useMemo(() => {
    return orders[orders.length - 1];
  });

  // If there's no order, show an error or placeholder
  if (!lastOrder) {
    return (
      <div
        id="no-order-container"
        style={{ padding: "2rem", minHeight: "500px" }}
      >
        <h1 id="no-order-header">No Order Found</h1>
        <p>It looks like you haven’t placed an order yet!</p>
      </div>
    );
  }

  const { id, items, total } = lastOrder;

  return (
    <div className="thank-you-container">
      <h1 id="thank-you-header">Thank You For Your Order!</h1>
      <p>Your order was successfully placed.</p>

      <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <strong>Order ID:</strong> {id}
      </div>

      <h2 id="order-summary-header">Order Summary</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: "0.5rem" }}>
            {item.name} <br />
            Quantity: {item.quantity} <br />
            Price: ${item.price} each
          </li>
        ))}
      </ul>
      <p>
        <strong>Total:</strong> ${total}
      </p>

      <p style={{ marginTop: "2rem" }}>
        We appreciate your business and hope to serve you again soon!
      </p>
    </div>
  );
};

export default ThankYou;
