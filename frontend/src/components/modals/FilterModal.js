import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Switch,
} from 'react-native';

const FilterModal = ({
  isFilterModalVisible,
  setIsFilterModalVisible,
  priceRange,
  setPriceRange,
  selectedColour,
  setSelectedColour,
  selectedBrand,
  setSelectedBrand,
  isInStock,
  setIsInStock,
  applyFilters,
  discardFilters,
}) => {
  return (
    <Modal
      visible={isFilterModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setIsFilterModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setIsFilterModalVisible(false)}>
        <View className="flex-1 justify-end">
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-gray-800 opacity-50" />
          <View className="bg-white p-4 rounded-t-xl border border-gray-300">
            <Text className="text-lg font-bold mb-4 text-center">Filter</Text>
            <Text className="text-sm font-semibold mb-2">Price Range</Text>
            <View className="flex-row items-center mb-4">
              <TextInput
                className="flex-1 border border-gray-300 rounded p-2 mr-2"
                keyboardType="numeric"
                value={priceRange[0] !== null ? priceRange[0].toString() : ''}
                onChangeText={(value) =>
                  setPriceRange([value ? parseFloat(value) : 0, priceRange[1]])
                }
                placeholder="Min Price"
              />
              <TextInput
                className="flex-1 border border-gray-300 rounded p-2"
                keyboardType="numeric"
                value={priceRange[1] !== null ? priceRange[1].toString() : ''}
                onChangeText={(value) =>
                  setPriceRange([priceRange[0], value ? parseFloat(value) : 0])
                }
                placeholder="Max Price"
              />
            </View>
            <Text className="text-sm font-semibold mb-2 mt-2">Colours</Text>
            <View className="flex-row flex-wrap justify-between mb-2">
              {[
                'Blue',
                'Black',
                'Multicoloured',
                'Purple',
                'Green',
                'Yellow',
              ].map((colour) => (
                <TouchableOpacity
                  key={colour}
                  className={`m-1 p-1 rounded-full items-center justify-center ${
                    selectedColour === colour ? 'border-2 border-black' : ''
                  }`}
                  style={{ width: 40, height: 40 }}
                  onPress={() =>
                    setSelectedColour(selectedColour === colour ? null : colour)
                  }
                >
                  {colour === 'Multicoloured' ? (
                    <View className="w-8 h-8 rounded-full overflow-hidden flex-row">
                      {[
                        'red',
                        'orange',
                        'yellow',
                        'green',
                        'blue',
                        'indigo',
                        'violet',
                      ].map((color, index) => (
                        <View
                          key={index}
                          className="flex-1"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </View>
                  ) : (
                    <View
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: colour.toLowerCase() }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <Text className="text-sm font-semibold mb-2 mt-2">Brands</Text>
            <View className="flex-row flex-wrap justify-between">
              {['Nike', 'Adidas', 'Puma', 'Reebok'].map((brand) => (
                <TouchableOpacity
                  key={brand}
                  className={`flex-1 m-1 p-2 rounded-full border items-center justify-center ${
                    selectedBrand === brand ? 'bg-black' : 'bg-white'
                  }`}
                  onPress={() =>
                    setSelectedBrand(selectedBrand === brand ? null : brand)
                  }
                >
                  <Text
                    className={`text-center ${
                      selectedBrand === brand ? 'text-white' : 'text-black'
                    }`}
                  >
                    {brand}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text className="text-sm font-semibold mb-2 mt-2">In Stock</Text>
            <View className="flex-row items-center mb-4">
              <Switch
                value={isInStock}
                onValueChange={(value) => setIsInStock(value)}
                trackColor={{ false: '#767577', true: '#908f91' }}
                thumbColor={isInStock ? '#000' : '#f4f3f4'}
              />
              <Text className="ml-2 text-sm">{isInStock ? 'Yes' : 'No'}</Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: '#e0e0e0',
                marginVertical: 10,
              }}
            />
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                className="bg-white border border-black px-4 py-2 rounded-full"
                onPress={discardFilters}
              >
                <Text className="text-black">Discard</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-black px-4 py-2 rounded-full"
                onPress={applyFilters}
              >
                <Text className="text-white">Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FilterModal;
