import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { styled } from 'nativewind';
import { addToCart } from '../../redux/cartSlice';
import { showAlert } from './alertUtils';

const StyledView = styled(View);

const ProductActions = ({
  product,
  selectedSize,
  quantity,
  dispatch,
  isOutOfStock,
}) => {
  const handleAddToCart = () => {
    if (!selectedSize) {
      showAlert('Please select a size', 'WARNING');
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

    showAlert('Item was added to cart', 'SUCCESS');
  };

  return (
    <StyledView className="px-3 pb-5">
      <Button
        mode="contained"
        onPress={handleAddToCart}
        className="bg-black text-white rounded-full w-full text-xl py-1"
        disabled={isOutOfStock}
      >
        Add to Cart
      </Button>
    </StyledView>
  );
};

export default ProductActions;
