import React, { useState } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CustomAlert from './CustomAlert';
import { calculateTotal, handleConfirmDelete, handleDelete } from './cartUtils';
import { removeFromCart } from '../../redux/cartSlice';
import Header from '../../components/Header';
import TotalAmount from './TotalAmount';
import CartItemList from './CartItemList';
import BottomButton from '../../components/BottomButton';

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <View className="flex-1 bg-gray-200">
      <Header
        navigation={null}
        isSearchBarVisible={false}
        setIsSearchBarVisible={() => {}}
        searchQuery=""
        setSearchQuery={() => {}}
        products={[]}
        setFilteredProducts={() => {}}
        showSearchIcon={false}
        showBackButton={false}
        title="Cart"
      />
      <CartItemList
        cartItems={cartItems}
        onDelete={(item) =>
          handleDelete(item, setSelectedItem, setAlertVisible)
        }
      />
      <TotalAmount cartItems={cartItems} calculateTotal={calculateTotal} />
      <BottomButton
        onPress={() => {
          console.log('Checkout button pressed');
        }}
        label="Checkout"
      />
      <CustomAlert
        visible={alertVisible}
        title="Remove Item"
        message="Are you sure you want to remove this item from the cart?"
        onCancel={() => setAlertVisible(false)}
        onConfirm={() =>
          handleConfirmDelete(dispatch, selectedItem, setAlertVisible)
        }
      />
    </View>
  );
};

export default CartScreen;
