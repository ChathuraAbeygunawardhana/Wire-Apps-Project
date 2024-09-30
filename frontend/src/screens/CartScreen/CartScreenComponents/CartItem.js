import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CartItem = ({ item, onDelete, onUpdateQuantity }) => {
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
                onUpdateQuantity(item.id, item.size, item.quantity - 1)
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
                onUpdateQuantity(item.id, item.size, item.quantity + 1)
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
      <TouchableOpacity onPress={onDelete} className="absolute top-4 right-3">
        <Icon name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;
