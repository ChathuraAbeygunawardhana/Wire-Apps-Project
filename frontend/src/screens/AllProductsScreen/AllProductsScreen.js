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
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import renderGridItem from '../../components/renderGridItem';
import renderListItem from '../../components/renderListItem';
import Header from '../../components/Header';
import FilterSortBar from '../../components/FilterSortBar';
import SortModal from '../../components/SortModal';
import FilterModal from '../../components/FilterModal';

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

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header
        navigation={navigation}
        isSearchBarVisible={isSearchBarVisible}
        setIsSearchBarVisible={setIsSearchBarVisible}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        products={products}
        setFilteredProducts={setFilteredProducts}
      />
      <View style={styles.mainView}>
        <FilterSortBar
          setIsFilterModalVisible={setIsFilterModalVisible}
          setIsSortModalVisible={setIsSortModalVisible}
          selectedSortOption={selectedSortOption}
          isListView={isListView}
          setIsListView={setIsListView}
        />
        {isLoading ? (
          <View style={styles.loadingView}>
            <ActivityIndicator size="large" color="#4e4e68" />
            <Text style={styles.loadingText}>Loading products</Text>
          </View>
        ) : hasError ? (
          <View style={styles.errorView}>
            <Text style={styles.errorText}>Couldn't find any products</Text>
          </View>
        ) : filteredProducts.length === 0 ? (
          <View style={styles.noProductsView}>
            <Text style={styles.noProductsText}>
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
            contentContainerStyle={styles.flatListContent}
          />
        )}
      </View>
      <SortModal
        isSortModalVisible={isSortModalVisible}
        setIsSortModalVisible={setIsSortModalVisible}
        sortProducts={sortProducts}
      />
      <FilterModal
        isFilterModalVisible={isFilterModalVisible}
        setIsFilterModalVisible={setIsFilterModalVisible}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedColour={selectedColour}
        setSelectedColour={setSelectedColour}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        isInStock={isInStock}
        setIsInStock={setIsInStock}
        applyFilters={applyFilters}
        discardFilters={discardFilters}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  mainView: {
    flex: 1,
    marginHorizontal: 12,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
  },
  errorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
  },
  noProductsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductsText: {
    fontSize: 14,
  },
  flatListContent: {
    paddingBottom: 16,
  },
});

export default AllProductsScreen;
