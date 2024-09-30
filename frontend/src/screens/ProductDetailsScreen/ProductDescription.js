import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const ProductDescription = ({ product }) => (
  <>
    <StyledText
      className="text-base text-black mt-5"
      style={{ textAlign: 'justify' }}
    >
      {product.description}
    </StyledText>
    <StyledView className="flex-row items-center mt-5">
      <StyledText className="text-base">SKU - </StyledText>
      <StyledText className="text-base">{product.SKU}</StyledText>
    </StyledView>
    <StyledView className="mb-5" />
  </>
);

export default ProductDescription;
