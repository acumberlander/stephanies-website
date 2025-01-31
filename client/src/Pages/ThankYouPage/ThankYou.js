import { useMemo } from "react";
import { useSelector } from "react-redux";
import "./ThankYou.scss";

const ThankYou = () => {
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

  // Destructure lastOrder safely
  const { id, items, total } = lastOrder || {};

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
};

export default ThankYou;
