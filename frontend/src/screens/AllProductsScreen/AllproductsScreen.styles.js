import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  mainView: {
    flex: 1,
    marginHorizontal: 12,
  },
  noProductsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductsText: {
    fontSize: 14,
  },
  flatListContent: {
    paddingBottom: 16,
  },
});

export default styles;
