import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const AllProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 48) / 2; // 48 = padding (16 * 2) + gap between items (16)

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
        style={{ width: itemWidth, marginBottom: 16 }}
      >
        <View className="flex-1 p-3 bg-gray-100 rounded-lg shadow-md shadow-black/50">
          <Image
            source={{ uri: item.mainImage }}
            style={{ width: '100%', height: 120, borderRadius: 8 }} // Increased height to 120
            resizeMode="contain"
          />
          <Text
            className="mt-2 text-sm font-bold"
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

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Appbar.Header className="bg-white">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Shoes" className="items-center" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <View className="flex-1 px-4 bg-white">
        <View className="flex-row justify-around mb-4">
          <View className="bg-black px-8 py-2 rounded-2xl shadow-md shadow-black/50">
            <Text className="text-white text-xs">Nike</Text>
          </View>
          <View className="bg-black px-8 py-2 rounded-2xl shadow-md shadow-black/50">
            <Text className="text-white text-xs">Puma</Text>
          </View>
        </View>
        <View className="flex-row justify-around items-center mb-4 p-2 bg-white rounded-lg shadow-md shadow-black/50">
          <View className="flex-row items-center">
            <Ionicons name="filter" size={16} color="black" />
            <Text className="ml-2 text-xs">Filter</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="swap-vertical" size={16} color="black" />
            <Text className="ml-2 text-xs">Price: Low to High</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="list" size={20} color="black" />
          </View>
        </View>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllProductsScreen;
