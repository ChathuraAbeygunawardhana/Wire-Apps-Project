import { removeFromCart } from '../../../redux/cartSlice';

export const calculateTotal = (cartItems) => {
  return cartItems
    .reduce((total, item) => total + item.price.amount * item.quantity, 0)
    .toFixed(2);
};

export const handleConfirmDelete = (
  dispatch,
  selectedItem,
  setAlertVisible
) => {
  dispatch(removeFromCart({ id: selectedItem.id, size: selectedItem.size }));
  setAlertVisible(false);
};

export const handleDelete = (item, setSelectedItem, setAlertVisible) => {
  setSelectedItem(item);
  setAlertVisible(true);
};
