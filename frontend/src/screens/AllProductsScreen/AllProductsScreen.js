import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import renderGridItem from '../../components/renderGridItem';
import renderListItem from '../../components/renderListItem';
import Header from '../../components/Header';
import FilterSortBar from '../../components/FilterSortBar';

const AllProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isListView, setIsListView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('Sort');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedColours, setSelectedColours] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColour, setSelectedColour] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInStock, setIsInStock] = useState(false);

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

  const renderGridItemWrapper = ({ item, index }) =>
    renderGridItem({ item, index, navigation, itemWidth });
  const renderListItemWrapper = ({ item }) =>
    renderListItem({ item, navigation });

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
      const inStockMatch = !isInStock || product.stockStatus === 'IN STOCK';

      return (
        inPriceRange && colourMatch && sizeMatch && brandMatch && inStockMatch
      );
    });

    setFilteredProducts(filtered);
    setIsFilterModalVisible(false);
  };

  const discardFilters = () => {
    setSelectedColour(null);
    setSelectedSize(null);
    setSelectedBrand(null);
    setPriceRange([0, 1000]);
    setIsInStock(false);
    setFilteredProducts(products);
    setIsFilterModalVisible(false);
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
            <View className="flex-row items-center mb-4">
              <Text className="text-sm flex-1">
                ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}
              </Text>
              <MultiSlider
                values={priceRange}
                sliderLength={180}
                onValuesChange={(values) => setPriceRange(values)}
                min={0}
                max={100}
                step={1}
                allowOverlap={false}
                snapped
                selectedStyle={{
                  backgroundColor: 'black',
                }}
                markerStyle={{
                  backgroundColor: 'black',
                }}
                style={{ alignSelf: 'flex-end' }}
              />
            </View>
            <Text className="text-sm font-semibold mb-2 mt-2">Colours</Text>
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
            <Text className="text-sm font-semibold mb-2 mt-2">In Stock</Text>
            <View className="flex-row items-center mb-4">
              <Switch
                value={isInStock}
                onValueChange={(value) => setIsInStock(value)}
                trackColor={{ false: '#767577', true: '#908f91' }}
                thumbColor={isInStock ? '#000' : '#f4f3f4'}
              />
              <Text className="ml-2 text-sm">{isInStock ? 'Yes' : 'No'}</Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: '#e0e0e0',
                marginVertical: 10,
              }}
            />
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <Header
        navigation={navigation}
        isSearchBarVisible={isSearchBarVisible}
        setIsSearchBarVisible={setIsSearchBarVisible}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        products={products}
        setFilteredProducts={setFilteredProducts}
      />
      <View className="flex-1 mx-3">
        <FilterSortBar
          setIsFilterModalVisible={setIsFilterModalVisible}
          setIsSortModalVisible={setIsSortModalVisible}
          selectedSortOption={selectedSortOption}
          isListView={isListView}
          setIsListView={setIsListView}
        />
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size="large" color="#4e4e68" />
            <Text style={{ marginTop: 8, fontSize: 14 }}>Loading products</Text>
          </View>
        ) : hasError ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={{ fontSize: 14 }}>Couldn't find any products</Text>
          </View>
        ) : filteredProducts.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={{ fontSize: 14 }}>
              No products were found matching your selection
            </Text>
          </View>
        ) : (
          <FlatList
            key={isListView ? 'list' : 'grid'}
            data={filteredProducts}
            renderItem={
              isListView ? renderListItemWrapper : renderGridItemWrapper
            }
            keyExtractor={(item) => item.id}
            numColumns={isListView ? 1 : 2}
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
