import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

const CheckoutButton = () => {
  return (
    <View className="px-3 pb-5">
      <Button
        mode="contained"
        onPress={() => {
          console.log('Checkout button pressed');
        }}
        className="bg-black text-white rounded-full w-full text-xl py-1"
      >
        Checkout
      </Button>
    </View>
  );
};

export default CheckoutButton;
