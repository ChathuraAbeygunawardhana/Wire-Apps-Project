import React from 'react';
import { View, Text } from 'react-native';
import styles from '../AllproductsScreen.styles';
const NoProductsFound = () => (
  <View style={styles.noProductsView}>
    <Text style={styles.noProductsText}>
      No products were found matching your selection
    </Text>
  </View>
);

export default NoProductsFound;
