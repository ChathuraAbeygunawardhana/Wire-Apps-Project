import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { styled } from 'nativewind';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: 'Demo User',
    email: 'demouser@testmail.com',
    profilePicture:
      'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?w=740&t=st=1727610603~exp=1727611203~hmac=d37706e21bf17347aecda6eb56990b9f6ba680dc432f5a0a26aa46486b8405af',
  });

  return (
    <View className="flex-1 bg-gray-200">
      <Header
        navigation={navigation}
        isSearchBarVisible={false}
        setIsSearchBarVisible={() => {}}
        searchQuery=""
        setSearchQuery={() => {}}
        products={[]}
        setFilteredProducts={() => {}}
        showSearchIcon={false}
        showBackButton={false}
        title="Profile"
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <StyledView className="p-4 items-center">
          <StyledImage
            source={{
              uri: 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?w=740&t=st=1727610603~exp=1727611203~hmac=d37706e21bf17347aecda6eb56990b9f6ba680dc432f5a0a26aa46486b8405af',
            }}
            className="w-32 h-32 rounded-full"
          />

          <StyledText className="text-xl text-center mt-2">
            {user.name}
          </StyledText>
          <StyledText className="text-center text-gray-600">
            {user.email}
          </StyledText>
          <Button
            mode="contained"
            className="mt-4 bg-black w-64"
            labelStyle={styles.buttonLabelContained}
          >
            Edit Profile
          </Button>
          <Button
            mode="outlined"
            className="mt-4 border-black w-64"
            labelStyle={styles.buttonLabelOutlined}
          >
            Logout
          </Button>
        </StyledView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  buttonLabelContained: {
    color: 'white',
  },
  buttonLabelOutlined: {
    color: 'black',
  },
});

export default ProfileScreen;
