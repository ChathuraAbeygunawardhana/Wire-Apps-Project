import { Dialog } from 'react-native-alert-notification';
import { addToCart } from '../../../redux/cartSlice';
import { ALERT_TYPE } from 'react-native-alert-notification';

export const handleSizeChange = (
  size,
  isOutOfStock,
  setSelectedSize,
  showWarningDialog
) => {
  if (isOutOfStock) {
    showWarningDialog('Product is out of stock');
  } else {
    setSelectedSize(size);
  }
};

export const handleAddToCart = (
  selectedSize,
  product,
  quantity,
  dispatch,
  showWarningDialog,
  showSuccessDialog
) => {
  if (!selectedSize) {
    showWarningDialog('Please select a size');
    return;
  }

  dispatch(
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: quantity,
      image: product.mainImage,
      color: product.colour,
    })
  );

  showSuccessDialog('Item was added to cart');
};

export const showWarningDialog = (message) => {
  Dialog.show({
    type: ALERT_TYPE.WARNING,
    title: 'Size not selected',
    textBody: message,
    button: 'OK',
    titleStyle: { color: 'black' },
    textBodyStyle: { color: 'black' },
    buttonStyle: { backgroundColor: 'black' },
    buttonTextStyle: { color: 'white' },
  });
};

export const showSuccessDialog = (message) => {
  Dialog.show({
    type: ALERT_TYPE.SUCCESS,
    title: 'Added to cart',
    textBody: message,
    button: 'OK',
    titleStyle: { color: 'black' },
    textBodyStyle: { color: 'black' },
    buttonStyle: { backgroundColor: 'black' },
    buttonTextStyle: { color: 'white' },
  });
};
