import React from 'react';
import { Appbar } from 'react-native-paper';

const CartHeader = () => {
  return (
    <Appbar.Header className="bg-white">
      <Appbar.Content title="Cart" className="items-center" />
    </Appbar.Header>
  );
};

export default CartHeader;
