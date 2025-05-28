import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Missing Fields', 'Please enter both email and password.');
        return;
      }

      console.log('[1] Logging in with:', { email, password });

      const response = await fetch('http://192.168.0.204:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      console.log('[2] Status:', response.status);
      const data = await response.json();
      console.log('[3] Response:', data);

      if (response.ok && data.token) {
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('userId', String(data.user.id));
        await AsyncStorage.setItem('username', data.user.username);
        Alert.alert('Login Successful', `Welcome, ${data.user.username}!`);
        navigation.replace('Categories');
      } else {
        Alert.alert('Login Failed', data.message || 'Incorrect credentials.');
      }
    } catch (err) {
      console.error('[4] Login Error:', err);
      Alert.alert('Network Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text.trim())}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
