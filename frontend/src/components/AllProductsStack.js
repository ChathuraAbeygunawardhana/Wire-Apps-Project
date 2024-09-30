import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import AllProductsScreen from '../screens/AllProductsScreen/AllProductsScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen/ProductDetailsScreen';

const Stack = createStackNavigator();

const AllProductsStack = () => (
  <Stack.Navigator initialRouteName="AllProducts">
    <Stack.Screen
      name="AllProducts"
      component={AllProductsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ProductDetails"
      component={ProductDetailsScreen}
      options={{
        headerShown: false,
        ...TransitionPresets.ScaleFromCenterAndroid,
      }}
    />
  </Stack.Navigator>
);

export default AllProductsStack;
