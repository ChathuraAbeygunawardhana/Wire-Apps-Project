import React from 'react';
import { View, Text } from 'react-native';

const TotalAmount = ({ cartItems, calculateTotal }) => {
  return (
    <View className="p-4 border-t border-gray-200 flex-row justify-between">
      <Text className="text-lg">Total Amount:</Text>
      <Text className="text-xl font-bold">
        {calculateTotal(cartItems)}
        {cartItems.length > 0 && cartItems[0].price.currency === 'GBP'
          ? '£'
          : cartItems.length > 0
          ? cartItems[0].price.currency
          : ''}
      </Text>
    </View>
  );
};

export default TotalAmount;
