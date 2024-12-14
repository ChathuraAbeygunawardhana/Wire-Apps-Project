import React, { useEffect, useState, useRef, useContext } from 'react';
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
  Switch,
  StyleSheet,
} from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../../context/UserContext';
import { ItemClickContext } from '../../context/ItemClickContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: 'white',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'lightgrey',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
  },
  flatListContent: {
    paddingBottom: 16,
  },
  gridItem: {
    flex: 1,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gridItemImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  gridItemTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  gridItemContent: {
    fontSize: 12,
    color: '#666',
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 12,
  },
  listItemImage: {
    width: 96,
    height: 96,
    borderRadius: 8,
  },
  listItemContent: {
    flex: 1,
    padding: 12,
  },
  listItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  listItemText: {
    fontSize: 12,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    left: 0,
    alignSelf: 'center',
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 28,
    alignItems: 'center',
  },
  fabText: {
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'end',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'gray',
    opacity: 0.5,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalOption: {
    padding: 8,
  },
  modalOptionText: {
    fontSize: 14,
  },
  filterModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  filterModalSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  filterModalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterModalText: {
    fontSize: 14,
    flex: 1,
  },
  filterModalSwitch: {
    marginLeft: 8,
  },
  filterModalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  filterModalButton: {
    padding: 8,
    borderRadius: 8,
  },
  filterModalButtonText: {
    fontSize: 14,
  },
  filterModalButtonDiscard: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  filterModalButtonApply: {
    backgroundColor: 'black',
  },
  filterModalButtonTextDiscard: {
    color: 'black',
  },
  filterModalButtonTextApply: {
    color: 'white',
  },
});

const AllProductsScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const username = user?.username;
  const { itemPressCount, handleItemPress } = useContext(ItemClickContext);
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

  const searchInputRef = useRef(null);

  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 48) / 2;

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    fetch(
      'https://cars-database-with-image.p.rapidapi.com/api/search?q=Mercedes',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'cars-database-with-image.p.rapidapi.com',
          'x-rapidapi-key':
            '970b4fa26fmsh397f674876f86dap1a656cjsna4e0c2863761',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          // Filter unique products by title
          const uniqueProducts = Array.from(
            new Set(data.results.map((p) => p.title))
          ).map((title) => data.results.find((p) => p.title === title));
          setProducts(uniqueProducts);
          setFilteredProducts(uniqueProducts);
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

  const renderGridItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={handleItemPress}>
        <View
          style={{
            width: itemWidth,
            marginBottom: 16,
            marginLeft: index % 2 === 0 ? 0 : 22,
          }}
        >
          <View style={styles.gridItem}>
            <Image
              source={{ uri: item.image }}
              style={styles.gridItemImage}
              resizeMode="contain"
            />
            <Text
              style={styles.gridItemTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
            <Text style={styles.gridItemContent}>{item.content}</Text>
            <Text style={styles.gridItemContent}>{item.additional}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderListItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={handleItemPress}>
        <View style={styles.listItem}>
          <Image
            source={{ uri: item.image }}
            style={styles.listItemImage}
            resizeMode="contain"
          />
          <View style={styles.listItemContent}>
            <Text
              style={styles.listItemTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
            <Text style={styles.listItemText}>{item.content}</Text>
            <Text style={styles.listItemText}>{item.additional}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalBackground} />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort By</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => sortProducts('lowToHigh')}
            >
              <Text style={styles.modalOptionText}>Price: Low to High</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => sortProducts('highToLow')}
            >
              <Text style={styles.modalOptionText}>Price: High to Low</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => sortProducts('newest')}
            >
              <Text style={styles.modalOptionText}>Newest</Text>
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalBackground} />
          <View style={styles.modalContent}>
            <Text style={styles.filterModalTitle}>Filter</Text>
            <Text style={styles.filterModalSectionTitle}>Price Range</Text>
            <View style={styles.filterModalRow}>
              <Text style={styles.filterModalText}>
                ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}
              </Text>
            </View>
            <Text style={styles.filterModalSectionTitle}>Colours</Text>
            <View style={styles.filterModalRow}>
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
                  style={[
                    styles.filterModalButton,
                    selectedColour === colour
                      ? { borderColor: 'black', borderWidth: 2 }
                      : {},
                  ]}
                  onPress={() =>
                    setSelectedColour(selectedColour === colour ? null : colour)
                  }
                >
                  {colour === 'Multicoloured' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                      }}
                    >
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
                          style={{ flex: 1, backgroundColor: color }}
                        />
                      ))}
                    </View>
                  ) : (
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: colour.toLowerCase(),
                      }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.filterModalSectionTitle}>Brands</Text>
            <View style={styles.filterModalRow}>
              {['Nike', 'Adidas', 'Puma', 'Reebok'].map((brand) => (
                <TouchableOpacity
                  key={brand}
                  style={[
                    styles.filterModalButton,
                    selectedBrand === brand
                      ? styles.filterModalButtonApply
                      : styles.filterModalButtonDiscard,
                  ]}
                  onPress={() =>
                    setSelectedBrand(selectedBrand === brand ? null : brand)
                  }
                >
                  <Text
                    style={
                      selectedBrand === brand
                        ? styles.filterModalButtonTextApply
                        : styles.filterModalButtonTextDiscard
                    }
                  >
                    {brand}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.filterModalSectionTitle}>In Stock</Text>
            <View style={styles.filterModalRow}>
              <Switch
                value={isInStock}
                onValueChange={(value) => setIsInStock(value)}
                trackColor={{ false: '#767577', true: '#908f91' }}
                thumbColor={isInStock ? '#000' : '#f4f3f4'}
                style={styles.filterModalSwitch}
              />
              <Text style={styles.filterModalText}>
                {isInStock ? 'Yes' : 'No'}
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: '#e0e0e0',
                marginVertical: 10,
              }}
            />
            <View style={styles.filterModalButtonRow}>
              <TouchableOpacity
                style={[
                  styles.filterModalButton,
                  styles.filterModalButtonDiscard,
                ]}
                onPress={discardFilters}
              >
                <Text style={styles.filterModalButtonTextDiscard}>Discard</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterModalButton,
                  styles.filterModalButtonApply,
                ]}
                onPress={applyFilters}
              >
                <Text style={styles.filterModalButtonTextApply}>Apply</Text>
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
      // Ensure search results maintain unique titles
      const uniqueFiltered = Array.from(
        new Set(filtered.map((p) => p.title))
      ).map((title) => filtered.find((p) => p.title === title));
      setFilteredProducts(uniqueFiltered);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.navigate('SignIn')} />
        <Appbar.Content title={username || 'Shoes'} className="items-center" />
        {isSearchBarVisible && (
          <View style={styles.searchBar}>
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
        <Appbar.Action
          icon="magnify"
          onPress={handleSearchIconPress}
          style={{ opacity: 0 }}
        />
      </Appbar.Header>
      <View style={{ flex: 1, marginHorizontal: 12 }}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4e4e68" />
            <Text style={styles.loadingText}>Loading products</Text>
          </View>
        ) : hasError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Couldn't find any products</Text>
          </View>
        ) : filteredProducts.length === 0 ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
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
            contentContainerStyle={[styles.flatListContent, { paddingTop: 12 }]}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <TouchableOpacity style={styles.fab} onPress={() => {}}>
        <Text style={styles.fabText}>{`Items Pressed: ${itemPressCount}`}</Text>
      </TouchableOpacity>
      {renderSortModal()}
      {renderFilterModal()}
    </SafeAreaView>
  );
};

export default AllProductsScreen;
