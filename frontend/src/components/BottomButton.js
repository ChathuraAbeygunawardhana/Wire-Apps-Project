import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { styled } from 'nativewind';

const StyledView = styled(View);

const BottomButton = ({ onPress, disabled, label }) => (
  <StyledView className="px-3 pb-5">
    <Button
      mode="contained"
      onPress={onPress}
      className="bg-black text-white rounded-full w-full text-xl py-1"
      disabled={disabled}
    >
      {label}
    </Button>
  </StyledView>
);

export default BottomButton;
