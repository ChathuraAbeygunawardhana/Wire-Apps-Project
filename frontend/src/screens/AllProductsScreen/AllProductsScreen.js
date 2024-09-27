import { Text, View, FlatList, SafeAreaView, Image } from 'react-native';
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
    return (
      <View
        className="flex-1 m-2 p-4 bg-gray-200 rounded-lg shadow-md"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          flexBasis: '48%',
        }}
      >
        <Image
          source={{ uri: item.mainImage }}
          className="w-full h-40 rounded-lg"
        />
        <Text className="mt-2 text-lg font-bold">{item.name}</Text>
        <Text className="text-gray-600">{item.brandName}</Text>
        <Text className="text-gray-600">
          {item.price.amount} {item.price.currency}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Appbar.Header style={{ backgroundColor: 'white' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Shoes" style={{ alignItems: 'center' }} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <View className="flex-1 p-2 bg-white">
        <View className="flex-row justify-around mb-4">
          <View className="bg-black px-10 py-2 rounded-2xl">
            <Text className="text-white text-sm">Nike</Text>
          </View>
          <View className="bg-black px-10 py-2 rounded-2xl">
            <Text className="text-white text-sm">Puma</Text>
          </View>
        </View>
        <View
          className="flex-row justify-around items-center mb-4 p-2 bg-white rounded-lg"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
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
        />
      </View>
    </SafeAreaView>
  );
};

export default AllProductsScreen;
