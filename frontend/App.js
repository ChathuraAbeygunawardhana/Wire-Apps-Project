import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Provider, useSelector } from 'react-redux';
import { store } from './src/redux/store';
import { selectTotalItems } from './src/redux/cartSlice';
import Home from './src/screens/HomePage/Home';
import AllProductsScreen from './src/screens/AllProductsScreen/AllProductsScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen/ProductDetailsScreen';
import CartScreen from './src/screens/CartScreen/CartScreen';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import { View, Text, StyleSheet } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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

const TabBarIcon = ({ route, color, size, totalItems }) => {
  const iconName = {
    Home: 'home',
    Shop: 'pricetag',
    Cart: 'cart',
    Profile: 'person',
  }[route.name];

  return (
    <View>
      <Ionicons name={iconName} size={size} color={color} />
      {route.name === 'Cart' && totalItems > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalItems}</Text>
        </View>
      )}
    </View>
  );
};

const TabNavigator = () => {
  const totalItems = useSelector(selectTotalItems);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size }) => (
          <TabBarIcon
            route={route}
            color={color}
            size={size}
            totalItems={totalItems}
          />
        ),
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Shop" component={AllProductsStack} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingTop: 5,
    paddingBottom: 5,
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'black',
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default App;
