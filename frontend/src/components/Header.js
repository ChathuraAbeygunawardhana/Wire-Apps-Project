import React, { useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const Header = ({
  navigation,
  isSearchBarVisible,
  setIsSearchBarVisible,
  searchQuery,
  setSearchQuery,
  products,
  setFilteredProducts,
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
  );
};

export default Header;
