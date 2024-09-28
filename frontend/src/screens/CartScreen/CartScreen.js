import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../redux/cartSlice';
import { Appbar, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const renderItem = ({ item }) => {
    const words = item.name.split(' ');
    const firstLine = words.slice(0, 5).join(' ');
    const secondLine = words.slice(5).join(' ');

    return (
      <View className="flex-row justify-between items-center p-4 border-b border-gray-200 bg-white shadow-lg rounded-lg mt-3 relative">
        <Image
          source={{ uri: item.image }}
          className="w-20 h-20 rounded-md mr-4"
          resizeMode="contain"
        />
        <View className="flex-1">
          <View style={{ height: 40 }}>
            <Text className="font-bold" numberOfLines={2} ellipsizeMode="tail">
              {firstLine}
              {secondLine && (
                <Text>
                  {'\n'}
                  {secondLine}
                </Text>
              )}
            </Text>
          </View>
          <Text>
            Size: {item.size} Color: {item.color}
          </Text>
          <View className="flex-row justify-between items-center mt-2">
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
                <View className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center shadow-lg">
                  <Icon name="remove" size={15} color="black" />
                </View>
              </TouchableOpacity>
              <Text className="mx-2">{item.quantity}</Text>
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
                <View className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center shadow-lg">
                  <Icon name="add" size={15} color="black" />
                </View>
              </TouchableOpacity>
            </View>
            <Text className="ml-4 font-bold">
              {item.price.amount}{' '}
              {item.price.currency === 'GBP' ? '£' : item.price.currency}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            dispatch(removeFromCart({ id: item.id, size: item.size }))
          }
          className="absolute top-4 right-3"
        >
          <Icon name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price.amount * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <View className="flex-1 bg-gray-200">
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
            className="px-2"
          />
          <View className="p-4 border-t border-gray-200 flex-row justify-between">
            <Text className="text-xl">Total Amount:</Text>
            <Text className="text-xl font-bold">
              {calculateTotal()}
              {cartItems[0].price.currency === 'GBP'
                ? '£'
                : cartItems[0].price.currency}
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
        </>
      )}
    </View>
  );
};

export default CartScreen;
