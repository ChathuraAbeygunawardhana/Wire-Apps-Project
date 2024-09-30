import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { updateQuantity } from '../../redux/cartSlice';

const CartItemList = ({ cartItems, onDelete }) => {
  const dispatch = useDispatch();

  return cartItems.length === 0 ? (
    <View className="flex-1 justify-center items-center">
      <Text>Your cart is empty</Text>
    </View>
  ) : (
    <FlatList
      data={cartItems}
      renderItem={({ item }) => (
        <CartItem
          item={item}
          onDelete={() => onDelete(item)}
          onUpdateQuantity={(id, size, quantity) =>
            dispatch(updateQuantity({ id, size, quantity }))
          }
        />
      )}
      keyExtractor={(item) => `${item.id}-${item.size}`}
      className="px-2"
    />
  );
};

export default CartItemList;
