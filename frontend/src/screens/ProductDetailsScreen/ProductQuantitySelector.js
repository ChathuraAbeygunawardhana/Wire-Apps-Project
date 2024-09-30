import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const ProductQuantitySelector = ({ quantity, setQuantity, isOutOfStock }) => {
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <StyledView className="flex-row items-center justify-between mt-3">
      <StyledText className="text-base">Quantity</StyledText>
      <View className="flex-row items-center">
        <TouchableOpacity
          onPress={decreaseQuantity}
          className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
          disabled={isOutOfStock}
        >
          <Ionicons name="remove" size={15} color="black" />
        </TouchableOpacity>
        <StyledText className="text-base mx-3">{quantity}</StyledText>
        <TouchableOpacity
          onPress={increaseQuantity}
          className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
          disabled={isOutOfStock}
        >
          <Ionicons name="add" size={15} color="black" />
        </TouchableOpacity>
      </View>
    </StyledView>
  );
};

export default ProductQuantitySelector;
