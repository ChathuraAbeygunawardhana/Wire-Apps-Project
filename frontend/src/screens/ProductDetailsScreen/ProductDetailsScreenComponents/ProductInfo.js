import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const ProductInfo = ({ product }) => {
  const productNameWords = product.name.split(' ');
  const firstLine = productNameWords.slice(0, 3).join(' ');
  const secondLine = productNameWords.slice(3, 7).join(' ');
  const thirdLine = productNameWords.slice(7).join(' ');

  const isOutOfStock = product.stockStatus !== 'IN STOCK';

  return (
    <>
      <View className="flex-row justify-between items-start my-2">
        <View>
          <StyledText className="text-xl font-bold">{firstLine}</StyledText>
          {secondLine && (
            <StyledText className="text-xl font-bold">{secondLine}</StyledText>
          )}
          {thirdLine && (
            <StyledText className="text-xl font-bold">{thirdLine}</StyledText>
          )}
        </View>
        <StyledText className="text-xl font-bold text-black">
          {product.price.amount}
          {product.price.currency === 'GBP' ? '£' : product.price.currency}
        </StyledText>
      </View>
      <View className="flex-row justify-between items-center">
        <StyledText className="text-lg text-gray-500">
          {product.brandName ? product.brandName : 'unbranded'} -{' '}
          {product.colour}
        </StyledText>
        <StyledText
          className={`text-lg ${
            isOutOfStock ? 'text-red-500' : 'text-gray-500'
          }`}
        >
          {product.stockStatus.toLowerCase()}
        </StyledText>
      </View>
    </>
  );
};

export default ProductInfo;
