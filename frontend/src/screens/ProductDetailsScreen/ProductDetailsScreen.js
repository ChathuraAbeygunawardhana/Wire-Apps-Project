import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { styled } from 'nativewind';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { Ionicons } from '@expo/vector-icons';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from 'react-native-alert-notification';

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

  const handleSizeChange = (size) => {
    if (isOutOfStock) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Warning',
        textBody: 'Product is out of stock',
        button: 'OK',
        titleStyle: { color: 'black' },
        textBodyStyle: { color: 'black' },
        buttonStyle: { backgroundColor: 'black' },
        buttonTextStyle: { color: 'white' },
      });
    } else {
      setSelectedSize(size);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Size not selected',
        textBody: 'Please select a size',
        button: 'OK',
        titleStyle: { color: 'black' },
        textBodyStyle: { color: 'black' },
        buttonStyle: { backgroundColor: 'black' },
        buttonTextStyle: { color: 'white' },
      });
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        quantity: quantity,
        image: product.mainImage,
        color: product.colour,
      })
    );

    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Added to cart',
      textBody: 'Item was added to cart',
      button: 'OK',
      titleStyle: { color: 'black' },
      textBodyStyle: { color: 'black' },
      buttonStyle: { backgroundColor: 'black' },
      buttonTextStyle: { color: 'white' },
    });
  };

  return (
    <AlertNotificationRoot>
      <StyledView className="flex-1 bg-white">
        <Appbar.Header className="bg-white h-14">
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content
            title="Product Details          "
            className="items-center"
          />
        </Appbar.Header>
        <ScrollView className="px-4 flex-1">
          <StyledImage
            source={{ uri: product.mainImage }}
            className="w-full h-64 rounded-lg"
            resizeMode="contain"
          />
          <View className="flex-row justify-between items-start my-2">
            <View>
              <StyledText className="text-xl font-bold">{firstLine}</StyledText>
              {secondLine && (
                <StyledText className="text-xl font-bold">
                  {secondLine}
                </StyledText>
              )}
              {thirdLine && (
                <StyledText className="text-xl font-bold">
                  {thirdLine}
                </StyledText>
              )}
            </View>
            <StyledText className="text-xl font-bold text-black">
              {product.price.amount}
              {product.price.currency === 'GBP' ? '£' : product.price.currency}
            </StyledText>
          </View>
          <View className="flex-row justify-between items-center">
            <StyledText className="text-lg text-gray-500">
              {product.brandName} - {product.colour}
            </StyledText>
            <StyledText
              className={`text-lg ${
                isOutOfStock ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              {product.stockStatus.toLowerCase()}
            </StyledText>
          </View>
          <View className="flex-row justify-between items-center mt-5">
            <StyledText className="text-base">Size</StyledText>
            <View className="flex-row flex-wrap justify-end">
              {product.sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  onPress={() => handleSizeChange(size)}
                  className={`border rounded-md px-3 py-2 ml-2 w-12 items-center justify-center ${
                    selectedSize === size
                      ? 'bg-black border-black'
                      : 'bg-white border-black'
                  }`}
                >
                  <StyledText
                    className={`text-base ${
                      selectedSize === size ? 'text-white' : 'text-black'
                    }`}
                  >
                    {size}
                  </StyledText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View className="flex-row items-center justify-between mt-3">
            <StyledText className="text-base">Quantity</StyledText>
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={decreaseQuantity}
                className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
                disabled={isOutOfStock}
              >
                <Ionicons name="remove" size={15} color="black" />
              </TouchableOpacity>
              <StyledText className="text-base mx-3">{quantity}</StyledText>
              <TouchableOpacity
                onPress={increaseQuantity}
                className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
                disabled={isOutOfStock}
              >
                <Ionicons name="add" size={15} color="black" />
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
                  product.price.currency === 'GBP'
                    ? '£'
                    : product.price.currency
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
    </AlertNotificationRoot>
  );
};

export default ProductDetailsScreen;
