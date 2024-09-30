import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';

const renderListItem = ({ item, navigation }) => {
  const currencySymbol =
    item.price.currency === 'GBP' ? '£' : item.price.currency;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
      className="flex-row mb-4 bg-white rounded-lg shadow-md shadow-black/50 px-5"
    >
      <Image
        source={{ uri: item.mainImage }}
        className="w-24 h-24 rounded-l-lg"
        resizeMode="contain"
      />
      <View className="flex-1 p-3">
        <Text
          className="text-sm font-bold"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>
        <Text className="text-xs text-gray-600">{item.brandName}</Text>
        <Text className="text-xs text-gray-600">
          {item.price.amount} {currencySymbol}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default renderListItem;
