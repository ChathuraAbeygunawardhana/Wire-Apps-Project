import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../redux/cartSlice';
import { Appbar } from 'react-native-paper';

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 }, // Adjusted height to direct shadow downwards
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 8,
        marginTop: 12,
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: 80, height: 80, borderRadius: 8, marginRight: 16 }}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
        <Text>Size: {item.size}</Text>
        <Text>
          Price: {item.price.amount}{' '}
          {item.price.currency === 'GBP' ? '£' : item.price.currency}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
          <Text style={{ fontSize: 24, paddingHorizontal: 8 }}>-</Text>
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
          <Text style={{ fontSize: 24, paddingHorizontal: 8 }}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            dispatch(removeFromCart({ id: item.id, size: item.size }))
          }
          style={{ marginLeft: 16 }}
        >
          <Text style={{ color: 'red' }}>Remove</Text>
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
    <View style={{ flex: 1, backgroundColor: '#E5E7EB' }}>
      <Appbar.Header style={{ backgroundColor: 'white' }}>
        <Appbar.Content title="Cart" style={{ alignItems: 'center' }} />
      </Appbar.Header>
      {cartItems.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}-${item.size}`}
            style={{ paddingHorizontal: 8 }}
          />
          <View
            style={{
              padding: 16,
              borderTopWidth: 1,
              borderTopColor: '#E5E7EB',
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Total: {calculateTotal()}{' '}
              {cartItems[0].price.currency === 'GBP'
                ? '£'
                : cartItems[0].price.currency}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;
