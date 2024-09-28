import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const AllProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [isListView, setIsListView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('Sort');
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 48) / 2;

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    fetch(
      'https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/products.json'
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result === 'success') {
          setProducts(data.data);
        } else {
          setHasError(true);
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);

  const sortProducts = (order) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (order === 'lowToHigh') {
        return a.price.amount - b.price.amount;
      } else if (order === 'highToLow') {
        return b.price.amount - a.price.amount;
      } else if (order === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    setProducts(sortedProducts);
    setSelectedSortOption(
      order === 'lowToHigh'
        ? 'Price: Low to High'
        : order === 'highToLow'
        ? 'Price: High to Low'
        : 'Newest'
    );
    setIsModalVisible(false);
  };

  const renderGridItem = ({ item }) => {
    const currencySymbol =
      item.price.currency === 'GBP' ? '£' : item.price.currency;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
        style={{ width: itemWidth, marginBottom: 16 }}
      >
        <View className="flex-1 p-3 bg-white rounded-lg shadow-md shadow-black/50">
          <Image
            source={{ uri: item.mainImage }}
            className="w-full h-32 rounded-lg"
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

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <Appbar.Header className="bg-white">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Shoes" className="items-center" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <View className="flex-1 mx-3">
        <View className="flex-row justify-between items-center mb-3 mt-3 p-2 bg-white rounded-lg shadow-md shadow-black/50">
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="filter" size={16} color="black" />
            <Text className="ml-2 text-sm">Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setIsModalVisible(true)}
          >
            <Ionicons name="swap-vertical" size={16} color="black" />
            <Text className="ml-2 text-sm">{selectedSortOption}</Text>
          </TouchableOpacity>
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
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#4e4e68" />
            <Text className="mt-2 text-sm">Loading products</Text>
          </View>
        ) : hasError ? (
          <View className="flex-1 justify-center items-center">
            <Text className="mt-2 text-sm">Couldn't find any products</Text>
          </View>
        ) : (
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
        )}
      </View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View className="flex-1 justify-end">
            <View className="absolute top-0 left-0 right-0 bottom-0 bg-gray-800 opacity-50" />
            <View className="bg-white p-4 rounded-t-xl border border-gray-300">
              <Text className="text-lg font-bold mb-4">Sort By</Text>
              <TouchableOpacity
                className="p-2"
                onPress={() => sortProducts('lowToHigh')}
              >
                <Text className="text-sm">Price: Low to High</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-2"
                onPress={() => sortProducts('highToLow')}
              >
                <Text className="text-sm">Price: High to Low</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-2"
                onPress={() => sortProducts('newest')}
              >
                <Text className="text-sm">Newest</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default AllProductsScreen;
