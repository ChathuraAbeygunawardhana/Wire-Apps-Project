import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import renderGridItem from '../../components/renderGridItem';
import renderListItem from '../../components/renderListItem';
import Header from '../../components/Header';
import FilterSortBar from '../../components/FilterSortBar';
import SortModal from '../../components/modals/SortModal';
import FilterModal from '../../components/modals/FilterModal';
import LoadingComponent from '../../components/LoadingComponent';
import ErrorView from '../../components/ErrorView';
import {
  fetchProducts,
  sortProducts,
  applyFilters,
  discardFilters,
} from '../../utils/productUtils';
import styles from './AllproductsScreen.styles';

const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - 48) / 2;

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
  const [selectedColour, setSelectedColour] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isInStock, setIsInStock] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts(setProducts, setFilteredProducts, setIsLoading, setHasError);
  }, []);

  const renderGridItemWrapper = ({ item, index }) =>
    renderGridItem({ item, index, navigation, itemWidth });
  const renderListItemWrapper = ({ item }) =>
    renderListItem({ item, navigation });

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
          <LoadingComponent />
        ) : hasError ? (
          <ErrorView />
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
        sortProducts={(order) =>
          sortProducts(
            order,
            filteredProducts,
            setFilteredProducts,
            setSelectedSortOption,
            setIsSortModalVisible
          )
        }
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
        applyFilters={() =>
          applyFilters(
            products,
            priceRange,
            selectedColour,
            selectedSize,
            selectedBrand,
            isInStock,
            setFilteredProducts,
            setIsFilterModalVisible
          )
        }
        discardFilters={() =>
          discardFilters(
            setSelectedColour,
            setSelectedSize,
            setSelectedBrand,
            setPriceRange,
            setIsInStock,
            setFilteredProducts,
            products,
            setIsFilterModalVisible
          )
        }
      />
    </SafeAreaView>
  );
};

export default AllProductsScreen;
