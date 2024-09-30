import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Appbar } from 'react-native-paper';
import { styled } from 'nativewind';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from 'react-native-alert-notification';

import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';
import AddToCartButton from './AddToCartButton';
import Header from '../../components/Header';

const StyledView = styled(View);
const StyledText = styled(Text);

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const isOutOfStock = product.stockStatus !== 'IN STOCK';

  const handleSizeChange = (size) => {
    if (isOutOfStock) {
      showWarningDialog('Product is out of stock');
    } else {
      setSelectedSize(size);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      showWarningDialog('Please select a size');
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

    showSuccessDialog('Item was added to cart');
  };

  const showWarningDialog = (message) => {
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      title: 'Warning',
      textBody: message,
      button: 'OK',
      titleStyle: { color: 'black' },
      textBodyStyle: { color: 'black' },
      buttonStyle: { backgroundColor: 'black' },
      buttonTextStyle: { color: 'white' },
    });
  };

  const showSuccessDialog = (message) => {
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Added to cart',
      textBody: message,
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
        <Header
          navigation={navigation}
          showSearchIcon={false}
          title="Product details"
        />
        <ScrollView className="px-4 flex-1">
          <ProductImage imageUrl={product.mainImage} />
          <ProductInfo product={product} />
          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSizeChange={handleSizeChange}
            isOutOfStock={isOutOfStock}
          />
          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            isOutOfStock={isOutOfStock}
          />
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
          <View className="flex-row items-center mt-5">
            <StyledText className="text-base">SKU - </StyledText>
            <StyledText className="text-base">{product.SKU}</StyledText>
          </View>
          <View className="mb-5" />
        </ScrollView>
        <AddToCartButton
          onPress={handleAddToCart}
          isOutOfStock={isOutOfStock}
        />
      </StyledView>
    </AlertNotificationRoot>
  );
};

export default ProductDetailsScreen;
