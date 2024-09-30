import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { styled } from 'nativewind';
import { useDispatch } from 'react-redux';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import ProductSizeSelector from './ProductSizeSelector';
import ProductQuantitySelector from './ProductQuantitySelector';
import ProductDescription from './ProductDescription';
import ProductActions from './ProductActions';

const StyledView = styled(View);

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const isOutOfStock = product.stockStatus !== 'IN STOCK';

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
          <ProductImage product={product} />
          <ProductInfo product={product} />
          <ProductSizeSelector
            product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            isOutOfStock={isOutOfStock}
          />
          <ProductQuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            isOutOfStock={isOutOfStock}
          />
          <ProductDescription product={product} />
        </ScrollView>
        <ProductActions
          product={product}
          selectedSize={selectedSize}
          quantity={quantity}
          dispatch={dispatch}
          isOutOfStock={isOutOfStock}
        />
      </StyledView>
    </AlertNotificationRoot>
  );
};

export default ProductDetailsScreen;
