import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './HomeScree.styles';

const LatestArrivalsButton = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>Latest Arrivals</Text>
    <Ionicons name="arrow-forward" size={16} color="#fff" />
  </TouchableOpacity>
);

export default LatestArrivalsButton;
