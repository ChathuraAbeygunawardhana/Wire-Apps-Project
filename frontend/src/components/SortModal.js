import React from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const SortModal = ({
  isSortModalVisible,
  setIsSortModalVisible,
  sortProducts,
}) => (
  <Modal
    visible={isSortModalVisible}
    transparent={true}
    animationType="slide"
    onRequestClose={() => setIsSortModalVisible(false)}
  >
    <TouchableWithoutFeedback onPress={() => setIsSortModalVisible(false)}>
      <View className="flex-1 justify-end">
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-gray-800 opacity-50" />
        <View className="bg-white p-4 rounded-t-xl border border-gray-300">
          <Text className="text-lg font-bold mb-4">Sort By</Text>
          <TouchableOpacity
            className="p-2"
            onPress={() => sortProducts('lowToHigh')}
          >
            <Text className="text-sm">Price: Low to High</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2"
            onPress={() => sortProducts('highToLow')}
          >
            <Text className="text-sm">Price: High to Low</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2"
            onPress={() => sortProducts('newest')}
          >
            <Text className="text-sm">Newest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

export default SortModal;
