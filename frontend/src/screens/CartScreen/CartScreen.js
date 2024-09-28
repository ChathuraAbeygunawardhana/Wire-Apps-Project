import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../redux/cartSlice';
import { Appbar } from 'react-native-paper';

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const renderItem = ({ item }) => (
    <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
      <View>
        <Text className="font-bold">{item.name}</Text>
        <Text>Size: {item.size}</Text>
        <Text>
          Price: {item.price.amount} {item.price.currency}
        </Text>
      </View>
      <View className="flex-row items-center">
        <TouchableOpacity
          onPress={() =>
            dispatch(
              updateQuantity({
                id: item.id,
                size: item.size,
                quantity: item.quantity - 1,
              })
            )
          }
          disabled={item.quantity === 1}
        >
          <Text className="text-2xl px-2">-</Text>
        </TouchableOpacity>
        <Text>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() =>
            dispatch(
              updateQuantity({
                id: item.id,
                size: item.size,
                quantity: item.quantity + 1,
              })
            )
          }
        >
          <Text className="text-2xl px-2">+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            dispatch(removeFromCart({ id: item.id, size: item.size }))
          }
          className="ml-4"
        >
          <Text className="text-red-500">Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price.amount * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <View className="flex-1 bg-white">
      <Appbar.Header className="bg-white">
        <Appbar.Content title="Cart" className="items-center" />
      </Appbar.Header>
      {cartItems.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}-${item.size}`}
          />
          <View className="p-4 border-t border-gray-200">
            <Text className="text-xl font-bold">
              Total: {calculateTotal()} {cartItems[0].price.currency}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;
