import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const SizeSelector = ({ sizes, selectedSize, onSizeChange, isOutOfStock }) => (
  <View className="flex-row justify-between items-center mt-5">
    <StyledText className="text-base">Size</StyledText>
    <View className="flex-row flex-wrap justify-end">
      {sizes.map((size) => (
        <TouchableOpacity
          key={size}
          onPress={() => onSizeChange(size)}
          className={`border rounded-md px-3 py-2 ml-2 w-12 items-center justify-center ${
            selectedSize === size
              ? 'bg-black border-black'
              : 'bg-white border-black'
          }`}
          disabled={isOutOfStock}
        >
          <StyledText
            className={`text-base ${
              selectedSize === size ? 'text-white' : 'text-black'
            }`}
          >
            {size}
          </StyledText>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

export default SizeSelector;
