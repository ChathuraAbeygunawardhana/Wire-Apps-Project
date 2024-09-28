import React from 'react';
import { View, Text, Image } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;

  return (
    <StyledView className="flex-1 px-1 bg-white">
      <Appbar.Header className="bg-white" style={{ height: 56 }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Product Details" className="items-center" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <View className="px-3">
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
      </View>
    </StyledView>
  );
};

export default ProductDetailsScreen;
