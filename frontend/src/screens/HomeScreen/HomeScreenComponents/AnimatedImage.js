import React from 'react';
import { Animated } from 'react-native';
import styles from '../HomeScree.styles';

const AnimatedImage = ({ fadeAnim }) => (
  <Animated.Image
    source={{ uri: 'https://i.ibb.co/D9Q1S0z/Classics.png' }}
    style={[styles.image, { opacity: fadeAnim }]}
  />
);

export default AnimatedImage;
