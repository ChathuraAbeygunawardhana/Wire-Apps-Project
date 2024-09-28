import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <StyledView className="flex-1 px-1 bg-white">
      <Appbar.Header className="bg-white h-14">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Product Details" className="items-center" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <View className="px-3 flex-1">
        <StyledImage
          source={{ uri: product.mainImage }}
          className="w-full h-48 rounded-lg"
          resizeMode="contain"
        />
        <StyledText className="text-2xl font-bold my-2">
          {product.name}
        </StyledText>
        <StyledText className="text-lg text-gray-500">
          {product.brandName}
        </StyledText>
        <StyledText className="text-lg text-gray-500 my-2">
          {product.price.amount}{' '}
          {product.price.currency === 'GBP' ? '£' : product.price.currency}
        </StyledText>
        <StyledText className="text-base text-black">
          {product.description}
        </StyledText>

        <View className="border border-gray-400 rounded-md mt-5">
          <Picker
            selectedValue={selectedSize}
            onValueChange={(itemValue) => setSelectedSize(itemValue)}
            className="h-12 justify-center items-center"
            itemStyle={{ textAlignVertical: 'center' }}
          >
            {selectedSize === null && <Picker.Item label="size" value={null} />}
            {product.sizes.map((size) => (
              <Picker.Item key={size} label={size} value={size} />
            ))}
          </Picker>
        </View>

        {/* quantity section */}
        <View className="flex-row items-center justify-between mt-5">
          <TouchableOpacity
            onPress={decreaseQuantity}
            className="bg-gray-200 p-2 rounded-full"
          >
            <Text className="text-lg">-</Text>
          </TouchableOpacity>
          <StyledText className="text-lg">{quantity}</StyledText>
          <TouchableOpacity
            onPress={increaseQuantity}
            className="bg-gray-200 p-2 rounded-full"
          >
            <Text className="text-lg">+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="px-3 pb-5">
        <Button
          mode="contained"
          onPress={() => {}}
          className="bg-black text-white rounded-full w-full text-xl py-1"
        >
          Add to Cart
        </Button>
      </View>
    </StyledView>
  );
};

export default ProductDetailsScreen;
