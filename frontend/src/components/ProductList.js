import React from 'react';
import { FlatList } from 'react-native';
import LoadingComponent from '../components/LoadingComponent';
import ErrorView from '../components/ErrorView';
import NoProductsFound from '../components/NoProductsFound';
import styles from '../screens/AllProductsScreen/AllproductsScreen.styles';

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
