import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';

const SignInScreen = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('exampleUser');
  const [password, setPassword] = useState('Helloworld123@@@');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateUsername = (username) => {
    if (username === '') {
      return 'Username is required';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (password === '') {
      return 'Password is required';
    } else if (password.length < 8) {
      return 'Password must be at least 8 characters';
    } else if (password.length > 64) {
      return 'Password must be less than 64 characters';
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
        password
      )
    ) {
      return 'Password must contain an uppercase letter, a lowercase letter, a number, and a special character';
    } else if (/\s/.test(password)) {
      return 'Password must not contain spaces';
    }
    return '';
  };

  const handleSignIn = () => {
    const usernameValidationError = validateUsername(username);
    const passwordValidationError = validatePassword(password);
    if (usernameValidationError || passwordValidationError) {
      setEmailError(usernameValidationError);
      setPasswordError(passwordValidationError);
      return;
    }
    setEmailError('');
    setPasswordError('');
    setUser({ username, password });
    navigation.replace('MainApp', { username });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            padding: 16,
            backgroundColor: '#F8F9FA',
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={{ fontSize: 24, marginBottom: 40, textAlign: 'center' }}>
            Sign In
          </Text>
          <Text style={{ marginBottom: 8 }}>Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            style={{
              marginBottom: 16,
              padding: 8,
              backgroundColor: 'white',
              borderRadius: 50,
              borderColor: 'rgba(128, 128, 128, 0.5)', // Reduced opacity of border color
              borderWidth: 1,
            }}
          />
          {emailError ? (
            <Text style={{ color: 'red', marginBottom: 15, textAlign: 'right' }}>{emailError}</Text>
          ) : null}
          <Text style={{ marginBottom: 8 }}>Password</Text>
          <View style={{ marginBottom: 16, position: 'relative' }}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={{
                padding: 8,
                backgroundColor: 'white',
                borderRadius: 50,
                borderColor: 'rgba(128, 128, 128, 0.5)', // Reduced opacity of border color
                borderWidth: 1,
              }}
            />
            {password.length > 0 && (
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 16, top: 12 }}
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            )}
          </View>
          {passwordError ? (
            <Text style={{ color: 'red', marginBottom: 15, textAlign: 'right' }}>{passwordError}</Text>
          ) : null}
          <TouchableOpacity
            onPress={handleSignIn}
            style={{
              backgroundColor: 'black',
              padding: 12,
              borderRadius: 50,
              alignItems: 'center',
              marginTop: 24, // Added marginTop to move the button lower
            }}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{ marginTop: 24, textAlign: 'center' }}> {/* Increased marginTop */}
              <Text style={{ color: 'grey' }}>Don't have an account? </Text>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>
                Sign Up
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
