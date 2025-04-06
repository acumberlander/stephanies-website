export const formatStripeAmount = (amount) => {
  // Rounds to two decimal places to floor
  return (Math.floor(amount) / 100).toFixed(2);
}
