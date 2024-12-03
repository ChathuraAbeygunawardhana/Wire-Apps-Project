import React, { useState } from 'react';
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

const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === '') {
      return 'Email is required';
    } else if (!emailRegex.test(email)) {
      return 'Invalid email format';
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
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    if (emailValidationError || passwordValidationError) {
      setEmailError(emailValidationError);
      setPasswordError(passwordValidationError);
      return;
    }
    setEmailError('');
    setPasswordError('');
    navigation.replace('MainApp');
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
          <Text style={{ marginBottom: 8 }}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{
              marginBottom: 16,
              padding: 8,
              backgroundColor: 'white',
              borderRadius: 50,
            }}
          />
          {emailError ? (
            <Text style={{ color: 'red', marginBottom: 15 }}>{emailError}</Text>
          ) : null}
          <Text style={{ marginBottom: 8 }}>Password</Text>
          <View style={{ marginBottom: 16, position: 'relative' }}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={{ padding: 8, backgroundColor: 'white', borderRadius: 50 }}
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
            <Text style={{ color: 'red', marginBottom: 15 }}>
              {passwordError}
            </Text>
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
