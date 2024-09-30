import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const QuantitySection = ({ selectedSize, quantity, price }) => {
  return (
    <StyledView className="flex-row justify-between items-center mt-5">
      <StyledText className="text-base">
        {`Size ${selectedSize} x ${quantity}`}
      </StyledText>
      <StyledText className="text-base font-bold">
        {`${(price.amount * quantity).toFixed(2)} ${
          price.currency === 'GBP' ? '£' : price.currency
        }`}
      </StyledText>
    </StyledView>
  );
};

export default QuantitySection;
