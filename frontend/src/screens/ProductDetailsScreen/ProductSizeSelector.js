import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styled } from 'nativewind';
import { showAlert } from './alertUtils';

const StyledView = styled(View);
const StyledText = styled(Text);

const ProductSizeSelector = ({
  product,
  selectedSize,
  setSelectedSize,
  isOutOfStock,
}) => {
  const handleSizeChange = (size) => {
    if (isOutOfStock) {
      showAlert('Product is out of stock', 'WARNING');
    } else {
      setSelectedSize(size);
    }
  };

  return (
    <StyledView className="flex-row justify-between items-center mt-5">
      <StyledText className="text-base">Size</StyledText>
      <View className="flex-row flex-wrap justify-end">
        {product.sizes.map((size) => (
          <TouchableOpacity
            key={size}
            onPress={() => handleSizeChange(size)}
            className={`border rounded-md px-3 py-2 ml-2 w-12 items-center justify-center ${
              selectedSize === size
                ? 'bg-black border-black'
                : 'bg-white border-black'
            }`}
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
    </StyledView>
  );
};

export default ProductSizeSelector;
