import React from 'react';
import { Image } from 'react-native';
import { styled } from 'nativewind';

const StyledImage = styled(Image);

const ProductImage = ({ imageUrl }) => (
  <StyledImage
    source={{ uri: imageUrl }}
    className="w-full h-64 rounded-lg"
    resizeMode="contain"
  />
);

export default ProductImage;
