import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';

const categories = [
  { id: '1', name: 'Antibiotics' },
  { id: '2', name: 'Cardiovascular' },
  { id: '3', name: 'Analgesics' },
  { id: '4', name: 'Respiratory' },
];

export default function CategoryScreen() {
  const navigation = useNavigation();
  const isAuthenticated = useAuth();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigation.replace('SignIn');
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('SignIn');
  };

  const handlePress = (categoryName) => {
    navigation.navigate('Drugs', { category: categoryName });
  };

  if (isAuthenticated === null) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drug Categories</Text>

      <Button
        title="View Learned Drugs"
        onPress={() => navigation.navigate('Learned Drugs')}
        color="#27ae60"
      />

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.button} onPress={() => handlePress(item.name)}>
            <Text style={styles.buttonText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' },
  button: {
    padding: 15,
    backgroundColor: '#3498db',
    marginVertical: 10,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 18, textAlign: 'center' },
});
