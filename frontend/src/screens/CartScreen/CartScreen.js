import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import CartItem from './CartItem';
import CustomAlert from './CustomAlert';
import { calculateTotal } from './cartUtils';
import { updateQuantity, removeFromCart } from '../../redux/cartSlice';
import CartHeader from './CartHeader';

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleConfirmDelete = () => {
    dispatch(removeFromCart({ id: selectedItem.id, size: selectedItem.size }));
    setAlertVisible(false);
  };

  return (
    <View className="flex-1 bg-gray-200">
      <CartHeader />
      {cartItems.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text>Your cart is empty</Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onDelete={() => {
                setSelectedItem(item);
                setAlertVisible(true);
              }}
              onUpdateQuantity={(id, size, quantity) =>
                dispatch(updateQuantity({ id, size, quantity }))
              }
            />
          )}
          keyExtractor={(item) => `${item.id}-${item.size}`}
          className="px-2"
        />
      )}
      <View className="p-4 border-t border-gray-200 flex-row justify-between">
        <Text className="text-xl">Total Amount:</Text>
        <Text className="text-xl font-bold">
          {calculateTotal(cartItems)}
          {cartItems.length > 0 && cartItems[0].price.currency === 'GBP'
            ? '£'
            : cartItems.length > 0
            ? cartItems[0].price.currency
            : ''}
        </Text>
      </View>
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
      <CustomAlert
        visible={alertVisible}
        title="Remove Item"
        message="Are you sure you want to remove this item from the cart?"
        onCancel={() => setAlertVisible(false)}
        onConfirm={handleConfirmDelete}
      />
    </View>
  );
};

export default CartScreen;
