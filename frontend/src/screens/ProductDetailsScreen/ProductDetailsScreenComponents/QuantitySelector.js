import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);

const QuantitySelector = ({ quantity, setQuantity, isOutOfStock }) => {
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <View className="flex-row items-center justify-between mt-3">
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
    </View>
  );
};

export default QuantitySelector;
