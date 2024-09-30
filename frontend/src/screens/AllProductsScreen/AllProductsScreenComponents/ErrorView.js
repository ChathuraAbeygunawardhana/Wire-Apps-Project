import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorView = () => (
  <View style={styles.errorView}>
    <Text style={styles.errorText}>Couldn't find any products</Text>
  </View>
);

const styles = StyleSheet.create({
  errorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
  },
});

export default ErrorView;
