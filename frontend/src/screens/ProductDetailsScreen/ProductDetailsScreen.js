import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { styled } from 'nativewind';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const productNameWords = product.name.split(' ');
  const firstLine = productNameWords.slice(0, 3).join(' ');
  const secondLine = productNameWords.slice(3, 7).join(' ');
  const thirdLine = productNameWords.slice(7).join(' ');

  const isOutOfStock = product.stockStatus !== 'IN STOCK';

  const handleSizeChange = (itemValue) => {
    if (isOutOfStock) {
      Alert.alert('Product is out of stock');
    } else {
      setSelectedSize(itemValue);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      Alert.alert('Please select a size');
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        quantity: quantity,
      })
    );

    Alert.alert('Success', 'Item added to cart');
  };

  return (
    <StyledView className="flex-1 bg-white">
      <Appbar.Header className="bg-white h-14">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Product Details" className="items-center" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <ScrollView className="px-4 flex-1">
        <StyledImage
          source={{ uri: product.mainImage }}
          className="w-full h-64 rounded-lg"
          resizeMode="contain"
        />
        <View className="flex-row justify-between items-start my-2">
          <View>
            <StyledText className="text-2xl font-bold">{firstLine}</StyledText>
            {secondLine && (
              <StyledText className="text-2xl font-bold">
                {secondLine}
              </StyledText>
            )}
            {thirdLine && (
              <StyledText className="text-2xl font-bold">
                {thirdLine}
              </StyledText>
            )}
          </View>
          <StyledText className="text-2xl font-bold text-gray-500">
            {product.price.amount}{' '}
            {product.price.currency === 'GBP' ? '£' : product.price.currency}
          </StyledText>
        </View>
        <View className="flex-row justify-between items-center">
          <StyledText className="text-lg text-gray-500">
            {product.brandName} - {product.colour}
          </StyledText>
          <StyledText
            className={`text-lg ${
              isOutOfStock ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {product.stockStatus.toLowerCase()}
          </StyledText>
        </View>
        <View className="border border-gray-400 rounded-md mt-5">
          <Picker
            selectedValue={selectedSize}
            onValueChange={handleSizeChange}
            className="h-12 justify-center items-center"
            itemStyle={{ textAlignVertical: 'center' }}
            enabled={!isOutOfStock}
          >
            {selectedSize === null && <Picker.Item label="size" value={null} />}
            {product.sizes.map((size) => (
              <Picker.Item key={size} label={size} value={size} />
            ))}
          </Picker>
        </View>
        <View className="flex-row items-center justify-between mt-5">
          <StyledText className="text-base">Quantity</StyledText>
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={decreaseQuantity}
              className="bg-gray-200 w-10 h-10 rounded-full items-center justify-center"
              disabled={isOutOfStock}
            >
              <Text className="text-lg">-</Text>
            </TouchableOpacity>
            <StyledText className="text-lg mx-3">{quantity}</StyledText>
            <TouchableOpacity
              onPress={increaseQuantity}
              className="bg-gray-200 w-10 h-10 rounded-full items-center justify-center"
              disabled={isOutOfStock}
            >
              <Text className="text-lg">+</Text>
            </TouchableOpacity>
          </View>
        </View>
        {selectedSize && (
          <View className="flex-row justify-between items-center mt-5">
            <StyledText className="text-base">
              {`Size ${selectedSize} x ${quantity}`}
            </StyledText>
            <StyledText className="text-base font-bold">
              {`${(product.price.amount * quantity).toFixed(2)} ${
                product.price.currency === 'GBP' ? '£' : product.price.currency
              }`}
            </StyledText>
          </View>
        )}
        <StyledText
          className="text-base text-black mt-5"
          style={{ textAlign: 'justify' }}
        >
          {product.description}
        </StyledText>
        <View className="mb-5" />
      </ScrollView>
      <View className="px-3 pb-5">
        <Button
          mode="contained"
          onPress={handleAddToCart}
          className="bg-black text-white rounded-full w-full text-xl py-1"
          disabled={isOutOfStock}
        >
          Add to Cart
        </Button>
      </View>
    </StyledView>
  );
};

export default ProductDetailsScreen;
