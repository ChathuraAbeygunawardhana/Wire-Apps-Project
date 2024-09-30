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

  return (
    <StyledView className="flex-row justify-between items-start my-2">
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
    </StyledView>
  );
};

export default ProductInfo;
