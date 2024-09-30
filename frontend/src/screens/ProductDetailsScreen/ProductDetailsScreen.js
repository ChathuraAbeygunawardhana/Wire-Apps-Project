import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Appbar } from 'react-native-paper';
import { styled } from 'nativewind';
import { useDispatch } from 'react-redux';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
} from 'react-native-alert-notification';

import ProductImage from './ProductDetailsScreenComponents/ProductImage';
import ProductInfo from './ProductDetailsScreenComponents/ProductInfo';
import SizeSelector from './ProductDetailsScreenComponents/SizeSelector';
import QuantitySelector from './ProductDetailsScreenComponents/QuantitySelector';
import Header from '../../components/Header';
import QuantitySection from './ProductDetailsScreenComponents/QuantitySection';
import {
  handleSizeChange,
  handleAddToCart,
  showWarningDialog,
  showSuccessDialog,
} from './ProductDetailsScreenComponents/ProductDetailsUtils';
import BottomButton from '../../components/BottomButton';

const StyledView = styled(View);
const StyledText = styled(Text);

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const isOutOfStock = product.stockStatus !== 'IN STOCK';

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
            onSizeChange={(size) =>
              handleSizeChange(
                size,
                isOutOfStock,
                setSelectedSize,
                showWarningDialog
              )
            }
            isOutOfStock={isOutOfStock}
          />
          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            isOutOfStock={isOutOfStock}
          />
          {selectedSize && (
            <QuantitySection
              selectedSize={selectedSize}
              quantity={quantity}
              price={product.price}
            />
          )}
          <StyledText className="text-base text-black mt-5 text-justify">
            {product.description}
          </StyledText>
          <View className="flex-row items-center mt-5">
            <StyledText className="text-base">SKU - </StyledText>
            <StyledText className="text-base">{product.SKU}</StyledText>
          </View>
          <View className="mb-5" />
        </ScrollView>
        <BottomButton
          onPress={() =>
            handleAddToCart(
              selectedSize,
              product,
              quantity,
              dispatch,
              showWarningDialog,
              showSuccessDialog
            )
          }
          disabled={isOutOfStock}
          label="Add to Cart"
        />
      </StyledView>
    </AlertNotificationRoot>
  );
};

export default ProductDetailsScreen;
