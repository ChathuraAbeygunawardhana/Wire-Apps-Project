import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const LoadingComponent = () => (
  <View style={styles.loadingView}>
    <ActivityIndicator size="large" color="#4e4e68" />
    <Text style={styles.loadingText}>Loading products</Text>
  </View>
);

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
  },
});

export default LoadingComponent;
