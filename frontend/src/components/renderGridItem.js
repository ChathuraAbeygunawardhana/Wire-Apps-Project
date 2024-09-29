import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Switch,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const renderGridItem = ({ item, index, navigation, itemWidth }) => {
  const currencySymbol =
    item.price.currency === 'GBP' ? '£' : item.price.currency;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
      style={{
        width: itemWidth,
        marginBottom: 16,
        marginLeft: index % 2 === 0 ? 0 : 22,
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 12,
          backgroundColor: 'white',
          borderRadius: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Image
          source={{ uri: item.mainImage }}
          style={{ width: '100%', height: 120, borderRadius: 8 }}
          resizeMode="contain"
        />
        <Text
          style={{ marginTop: 8, fontSize: 14, fontWeight: 'bold' }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>
        <Text style={{ fontSize: 12, color: '#666' }}>{item.brandName}</Text>
        <Text style={{ fontSize: 12, color: '#666' }}>
          {currencySymbol}
          {item.price.amount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default renderGridItem;
