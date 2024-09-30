import React from 'react';
import { FlatList } from 'react-native';
import LoadingComponent from './LoadingComponent';
import ErrorView from './ErrorView';
import NoProductsFound from './NoProductsFound';
import styles from '../AllproductsScreen.styles';

const ProductList = ({
  isLoading,
  hasError,
  filteredProducts,
  isListView,
  renderListItemWrapper,
  renderGridItemWrapper,
}) => {
  if (isLoading) {
    return <LoadingComponent />;
  }

  if (hasError) {
    return <ErrorView />;
  }

  if (filteredProducts.length === 0) {
    return <NoProductsFound />;
  }

  return (
    <FlatList
      key={isListView ? 'list' : 'grid'}
      data={filteredProducts}
      renderItem={isListView ? renderListItemWrapper : renderGridItemWrapper}
      keyExtractor={(item) => item.id}
      numColumns={isListView ? 1 : 2}
      contentContainerStyle={styles.flatListContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ProductList;
