import React from 'react';
import { Image } from 'react-native';
import { styled } from 'nativewind';

const StyledImage = styled(Image);

const ProductImage = ({ product }) => (
  <StyledImage
    source={{ uri: product.mainImage }}
    className="w-full h-64 rounded-lg"
    resizeMode="contain"
  />
);

export default ProductImage;
