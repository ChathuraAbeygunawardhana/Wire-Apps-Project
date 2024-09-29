import React, { useEffect, useState, useRef } from 'react';
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
  TextInput,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const AllProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isListView, setIsListView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('Sort');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedColours, setSelectedColours] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColour, setSelectedColour] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchInputRef = useRef(null);

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
          setFilteredProducts(data.data);
        } else {
          setHasError(true);
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        setIsLoading(false);
        setHasError(true);
      });
  }, []);

  const sortProducts = (order) => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (order === 'lowToHigh') {
        return a.price.amount - b.price.amount;
      } else if (order === 'highToLow') {
        return b.price.amount - a.price.amount;
      } else if (order === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    setFilteredProducts(sortedProducts);
    setSelectedSortOption(
      order === 'lowToHigh'
        ? 'Price: Low to High'
        : order === 'highToLow'
        ? 'Price: High to Low'
        : 'Newest'
    );
    setIsSortModalVisible(false);
  };

  const applyFilters = () => {
    let filtered = products.filter((product) => {
      const price = parseFloat(product.price.amount);
      const inPriceRange = price >= priceRange[0] && price <= priceRange[1];

      const colourMatch =
        !selectedColour ||
        (product.colour &&
          product.colour.toLowerCase() === selectedColour.toLowerCase());
      const sizeMatch =
        !selectedSize ||
        (product.sizes && product.sizes.includes(selectedSize));
      const brandMatch =
        !selectedBrand ||
        (product.brandName && product.brandName === selectedBrand);

      return inPriceRange && colourMatch && sizeMatch && brandMatch;
    });

    setFilteredProducts(filtered);
    setIsFilterModalVisible(false);
  };

  const discardFilters = () => {
    setSelectedColour(null);
    setSelectedSize(null);
    setSelectedBrand(null);
    setPriceRange([0, 1000]);
    setFilteredProducts(products);
    setIsFilterModalVisible(false);
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

  const renderSortModal = () => (
    <Modal
      visible={isSortModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setIsSortModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setIsSortModalVisible(false)}>
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
  );

  const renderFilterModal = () => (
    <Modal
      visible={isFilterModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setIsFilterModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setIsFilterModalVisible(false)}>
        <View className="flex-1 justify-end">
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-gray-800 opacity-50" />
          <View className="bg-white p-4 rounded-t-xl border border-gray-300">
            <Text className="text-lg font-bold mb-4 text-center">Filter</Text>

            <Text className="text-sm font-semibold mb-2">Price Range</Text>
            <Text className="text-sm mb-4">
              ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}
            </Text>

            <Text className="text-sm font-semibold mb-2">Colours</Text>
            <View className="flex-row flex-wrap justify-between mb-2">
              {[
                'Blue',
                'Black',
                'Multicoloured',
                'Purple',
                'Green',
                'Yellow',
              ].map((colour) => (
                <TouchableOpacity
                  key={colour}
                  className={`m-1 p-1 rounded-full items-center justify-center ${
                    selectedColour === colour ? 'border-2 border-black' : ''
                  }`}
                  style={{ width: 40, height: 40 }}
                  onPress={() =>
                    setSelectedColour(selectedColour === colour ? null : colour)
                  }
                >
                  {colour === 'Multicoloured' ? (
                    <View className="w-8 h-8 rounded-full overflow-hidden flex-row">
                      {[
                        'red',
                        'orange',
                        'yellow',
                        'green',
                        'blue',
                        'indigo',
                        'violet',
                      ].map((color, index) => (
                        <View
                          key={index}
                          className="flex-1"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </View>
                  ) : (
                    <View
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: colour.toLowerCase() }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-sm font-semibold mb-2 mt-2">Brands</Text>
            <View className="flex-row flex-wrap justify-between">
              {['Nike', 'Adidas', 'Puma', 'Reebok'].map((brand) => (
                <TouchableOpacity
                  key={brand}
                  className={`flex-1 m-1 p-2 rounded-full border items-center justify-center ${
                    selectedBrand === brand ? 'bg-black' : 'bg-white'
                  }`}
                  onPress={() =>
                    setSelectedBrand(selectedBrand === brand ? null : brand)
                  }
                >
                  <Text
                    className={`text-center ${
                      selectedBrand === brand ? 'text-white' : 'text-black'
                    }`}
                  >
                    {brand}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                className="bg-white border border-black px-4 py-2 rounded-full"
                onPress={discardFilters}
              >
                <Text className="text-black">Discard</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-black px-4 py-2 rounded-full"
                onPress={applyFilters}
              >
                <Text className="text-white">Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const handleSearchIconPress = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
    setSearchQuery('');
    setFilteredProducts(products);
  };

  useEffect(() => {
    if (isSearchBarVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchBarVisible]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <Appbar.Header className="bg-white">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        {!isSearchBarVisible && (
          <Appbar.Content title="Shoes" className="items-center" />
        )}
        {isSearchBarVisible && (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 5,
              borderColor: 'lightgrey',
              borderWidth: 1,
              paddingHorizontal: 10,
              marginRight: 10,
            }}
          >
            <TextInput
              ref={searchInputRef}
              style={{ flex: 1 }}
              placeholder="Search"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <TouchableOpacity onPress={handleSearchIconPress}>
              <Ionicons name="close" size={20} color="grey" />
            </TouchableOpacity>
          </View>
        )}
        <Appbar.Action icon="magnify" onPress={handleSearchIconPress} />
      </Appbar.Header>
      <View className="flex-1 mx-3">
        <View className="flex-row justify-between items-center mb-3 mt-3 p-2 bg-white rounded-lg shadow-md shadow-black/50">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setIsFilterModalVisible(true)}
          >
            <Ionicons name="filter" size={16} color="black" />
            <Text className="ml-2 text-sm">Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setIsSortModalVisible(true)}
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
        ) : filteredProducts.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="mt-2 text-sm">
              No products were found matching your selection
            </Text>
          </View>
        ) : (
          <FlatList
            key={isListView ? 'list' : 'grid'}
            data={filteredProducts}
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
      {renderSortModal()}
      {renderFilterModal()}
    </SafeAreaView>
  );
};

export default AllProductsScreen;
