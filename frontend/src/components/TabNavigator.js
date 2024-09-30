import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectTotalItems } from '../redux/cartSlice';
import Home from '../screens/HomeScreen/HomeScreen';
import AllProductsStack from './AllProductsStack';
import CartScreen from '../screens/CartScreen/CartScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

const Tab = createBottomTabNavigator();

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

export default TabNavigator;
