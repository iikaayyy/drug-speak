import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const allDrugs = {
  Antibiotics: [
    { id: '1', name: 'Amoxicillin' },
    { id: '2', name: 'Ciprofloxacin' },
  ],
  Cardiovascular: [
    { id: '3', name: 'Atenolol' },
    { id: '4', name: 'Lisinopril' },
  ],
  Analgesics: [
    { id: '5', name: 'Ibuprofen' },
    { id: '6', name: 'Paracetamol' },
  ],
  Respiratory: [
    { id: '7', name: 'Salbutamol' },
    { id: '8', name: 'Montelukast' },
  ],
};

export default function DrugListScreen({ route }) {
  const { category } = route.params;
  const navigation = useNavigation();

  const drugs = allDrugs[category] || [];

  const handlePress = (drug) => {
    navigation.navigate('Drug Details', { drug });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Drugs</Text>
      <FlatList
        data={drugs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.button} onPress={() => handlePress(item)}>
            <Text style={styles.buttonText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' },
  button: {
    padding: 15,
    backgroundColor: '#27ae60',
    marginVertical: 10,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 18, textAlign: 'center' },
});
