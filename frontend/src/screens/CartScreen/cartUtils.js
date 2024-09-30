export const calculateTotal = (cartItems) => {
  return cartItems
    .reduce((total, item) => total + item.price.amount * item.quantity, 0)
    .toFixed(2);
};
