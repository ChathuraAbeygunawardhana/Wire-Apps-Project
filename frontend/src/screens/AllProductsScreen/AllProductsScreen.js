import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const AllProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      'https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/products.json'
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result === 'success') {
          setProducts(data.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const renderItem = ({ item, index }) => {
    const currencySymbol =
      item.price.currency === 'GBP' ? '£' : item.price.currency;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
        style={{ flex: 1, margin: 2 }}
      >
        <View className="flex-1 p-4 bg-gray-100 rounded-lg shadow-md shadow-black/50">
          <Image
            source={{ uri: item.mainImage }}
            style={{ width: '100%', height: 100, borderRadius: 10 }} // Adjusted width and height
          />
          <Text
            className="mt-2 text-base font-bold"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ width: '100%' }}
          >
            {item.name}
          </Text>
          <Text className="text-gray-600">{item.brandName}</Text>
          <Text className="text-gray-600">
            {item.price.amount} {currencySymbol}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Appbar.Header className="bg-white">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Shoes" className="items-center" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <View className="flex-1 p-2 bg-white">
        <View className="flex-row justify-around mb-4">
          <View className="bg-black px-10 py-2 rounded-2xl shadow-md shadow-black/50">
            <Text className="text-white text-sm">Nike</Text>
          </View>
          <View className="bg-black px-10 py-2 rounded-2xl shadow-md shadow-black/50">
            <Text className="text-white text-sm">Puma</Text>
          </View>
        </View>
        <View className="flex-row justify-around items-center mb-4 p-2 bg-white rounded-lg shadow-md shadow-black/50">
          <View className="flex-row items-center">
            <Ionicons name="filter" size={20} color="black" />
            <Text className="ml-2">Filter</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="swap-vertical" size={20} color="black" />
            <Text className="ml-2">Price: Low to High</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="list" size={24} color="black" />
          </View>
        </View>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllProductsScreen;
