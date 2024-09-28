import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLatestArrivalsPress = () => {
    navigation.navigate('Shop', { screen: 'AllProducts' });
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Animated.Image
        source={{
          uri: 'https://i.ibb.co/D9Q1S0z/Classics.png',
        }}
        className="w-full h-full"
        style={{ opacity: fadeAnim }}
      />
      <TouchableOpacity
        className="absolute bottom-24 p-2 bg-black rounded-lg flex-row items-center"
        onPress={handleLatestArrivalsPress}
      >
        <Text className="text-white text-lg mr-1">Latest Arrivals</Text>
        <Ionicons name="arrow-forward" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
