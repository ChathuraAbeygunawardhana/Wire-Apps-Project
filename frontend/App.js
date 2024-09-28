import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Home from './src/screens/HomePage/Home';
import AllProductsScreen from './src/screens/AllProductsScreen/AllProductsScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen/ProductDetailsScreen';
import CartScreen from './src/screens/CartScreen/CartScreen';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';

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
        ...TransitionPresets.ScaleFromCenterAndroid, // Apply the scale from center animation
      }}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Shop') {
                iconName = 'pricetag';
              } else if (route.name === 'Cart') {
                iconName = 'cart';
              } else if (route.name === 'Profile') {
                iconName = 'person';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Shop" component={AllProductsStack} />
          <Tab.Screen name="Cart" component={CartScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
