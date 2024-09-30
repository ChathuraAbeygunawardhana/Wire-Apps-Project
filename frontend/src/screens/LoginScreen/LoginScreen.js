import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login button pressed');
  };

  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Text className="text-white text-2xl mb-4">Login</Text>
      <TextInput
        className="bg-white text-black w-3/4 p-2 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="bg-white text-black w-3/4 p-2 mb-4"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} color="#000" />
    </View>
  );
};

export default LoginScreen;
