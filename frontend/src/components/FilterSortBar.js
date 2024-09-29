import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FilterSortBar = ({
  setIsFilterModalVisible,
  setIsSortModalVisible,
  selectedSortOption,
  isListView,
  setIsListView,
}) => {
  return (
    <View className="flex-row justify-between items-center mb-3 mt-3 p-2 bg-white rounded-lg shadow-md shadow-black/50">
      <TouchableOpacity
        className="flex-row items-center"
        onPress={() => setIsFilterModalVisible(true)}
      >
        <Ionicons name="filter" size={16} color="black" />
        <Text className="ml-2 text-sm">Filter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center"
        onPress={() => setIsSortModalVisible(true)}
      >
        <Ionicons name="swap-vertical" size={16} color="black" />
        <Text className="ml-2 text-sm">{selectedSortOption}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center"
        onPress={() => setIsListView(!isListView)}
      >
        <Ionicons name={isListView ? 'grid' : 'list'} size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default FilterSortBar;
