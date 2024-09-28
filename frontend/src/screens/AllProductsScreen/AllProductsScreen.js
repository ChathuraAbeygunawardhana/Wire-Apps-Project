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
  const [isListView, setIsListView] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 48) / 2;

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

  const renderGridItem = ({ item }) => {
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
            className="w-full h-40 rounded-lg"
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

  const renderListItem = ({ item }) => {
    const currencySymbol =
      item.price.currency === 'GBP' ? '£' : item.price.currency;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
        className="flex-row mb-4 bg-gray-100 rounded-lg shadow-md shadow-black/50"
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
            <Text className="ml-2 text-sm">Filter</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="swap-vertical" size={16} color="black" />
            <Text className="ml-2 text-sm">Price: Low to High</Text>
          </View>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setIsListView(!isListView)}
          >
            <Ionicons
              name={isListView ? 'grid' : 'list'}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <FlatList
          key={isListView ? 'list' : 'grid'}
          data={products}
          renderItem={isListView ? renderListItem : renderGridItem}
          keyExtractor={(item) => item.id}
          numColumns={isListView ? 1 : 2}
          columnWrapperStyle={
            isListView ? null : { justifyContent: 'space-between' }
          }
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllProductsScreen;
