import React, { useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const Header = ({
  navigation,
  isSearchBarVisible,
  setIsSearchBarVisible,
  searchQuery,
  setSearchQuery,
  products,
  setFilteredProducts,
  showSearchIcon = true,
  showBackButton = true,
  title = 'Shoes',
}) => {
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isSearchBarVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchBarVisible]);

  const handleSearchIconPress = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
    setSearchQuery('');
    setFilteredProducts(products);
  };

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
    <Appbar.Header style={styles.header}>
      {showBackButton && (
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          size={screenWidth * 0.05}
        />
      )}
      {!isSearchBarVisible && (
        <Appbar.Content
          title={title}
          titleStyle={styles.title}
          style={styles.content}
        />
      )}
      {isSearchBarVisible && (
        <View style={styles.searchContainer}>
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <TouchableOpacity onPress={handleSearchIconPress}>
            <Ionicons name="close" size={screenWidth * 0.05} color="grey" />
          </TouchableOpacity>
        </View>
      )}
      {showSearchIcon && (
        <Appbar.Action
          icon="magnify"
          onPress={handleSearchIconPress}
          size={screenWidth * 0.06}
        />
      )}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: screenWidth * 0.05,
  },
  searchContainer: {
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
  searchInput: {
    flex: 1,
  },
});

export default Header;
