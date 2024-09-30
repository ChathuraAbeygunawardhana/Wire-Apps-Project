import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const renderGridItem = ({ item, index, navigation, itemWidth }) => {
  const currencySymbol =
    item.price.currency === 'GBP' ? '£' : item.price.currency;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
      style={[
        styles.touchableOpacity,
        { width: itemWidth, marginLeft: index % 2 === 0 ? 0 : 22 },
      ]}
    >
      <View style={styles.container}>
        <Image
          source={{ uri: item.mainImage }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.itemName} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
        <Text style={styles.brandName}>{item.brandName}</Text>
        <Text style={styles.price}>
          {currencySymbol}
          {item.price.amount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    marginBottom: 16,
  },
  container: {
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
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  itemName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  brandName: {
    fontSize: 12,
    color: '#666',
  },
  price: {
    fontSize: 12,
    color: '#666',
  },
});

export default renderGridItem;
