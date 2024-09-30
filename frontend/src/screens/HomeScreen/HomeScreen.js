import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AnimatedImage from './AnimatedImage';
import LatestArrivalsButton from './LatestArrivalsButton';
import styles from './HomeScree.styles';

const Home = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLatestArrivalsPress = () => {
    navigation.navigate('Shop', { screen: 'AllProducts' });
  };

  return (
    <View style={styles.container}>
      <AnimatedImage fadeAnim={fadeAnim} />
      <LatestArrivalsButton onPress={handleLatestArrivalsPress} />
    </View>
  );
};

export default Home;
