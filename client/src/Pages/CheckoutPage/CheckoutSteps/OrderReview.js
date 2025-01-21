
export const OrderReview = ({cartItems, subtotal, shippingFee, taxAmount, total}) => {
  return (
    <div className="confirmation-step">
      <h2>Order Review</h2>
      <div>
        {cartItems.map((item) => (
          <div className="order-review-item" key={item.id}>
            <img className="cart-item" src={item.images[0]} alt={item.name} />
            <div className="name-and-price">
              <p>{item.name}</p>
              <p>{item.price} x {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <p>Subtotal: ${subtotal}</p>
      <p>Shipping: ${shippingFee.toFixed(2)}</p>
      <p>Tax: ${taxAmount}</p>
      <strong>Total: ${total.toFixed(2)}</strong>
    </div>
  );
};