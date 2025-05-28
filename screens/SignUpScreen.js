import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const trimmedUsername = username.trim();
      const trimmedGender = gender.trim().toLowerCase();
      const trimmedEmail = email.trim();

      if (!trimmedUsername || !trimmedGender || !trimmedEmail || !password) {
        Alert.alert('Missing Fields', 'Please fill in all fields.');
        return;
      }

      if (trimmedGender !== 'male' && trimmedGender !== 'female') {
        Alert.alert('Invalid Gender', 'Gender must be "male" or "female".');
        return;
      }

      console.log('[1] Inputs:', {
        username: trimmedUsername,
        gender: trimmedGender,
        email: trimmedEmail,
        password,
      });

      const response = await fetch('http://192.168.0.204:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: trimmedUsername,
          gender: trimmedGender,
          email: trimmedEmail,
          password,
        }),
      });

      console.log('[2] Response Status:', response.status);
      const data = await response.json();
      console.log('[3] Response Body:', data);

      if (response.ok) {
        Alert.alert('Success', 'Account created! Please log in.');
        navigation.navigate('SignIn');
      } else {
        Alert.alert(
          'Signup Failed',
          Array.isArray(data.message)
            ? data.message.join('\n')
            : data.message || 'Something went wrong.'
        );
      }
    } catch (err) {
      console.error('[4] Signup Error:', err);
      Alert.alert('Network Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Gender (male/female)"
        value={gender}
        onChangeText={text => setGender(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />

      <Button title="Sign Up" onPress={handleSignUp} />
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
