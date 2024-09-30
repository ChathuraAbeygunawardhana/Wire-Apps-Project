import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { styled } from 'nativewind';

const StyledView = styled(View);

const AddToCartButton = ({ onPress, isOutOfStock }) => (
  <StyledView className="px-3 pb-5">
    <Button
      mode="contained"
      onPress={onPress}
      className="bg-black text-white rounded-full w-full text-xl py-1"
      disabled={isOutOfStock}
    >
      Add to Cart
    </Button>
  </StyledView>
);

export default AddToCartButton;
