import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const allDrugs = {
  "Pain Relievers": [
    { id: '1', name: 'Ibuprofen', soundKey: 'Ibuprofen 1 - male.wav' },
    { id: '2', name: 'Paracetamol', soundKey: 'Paracetamol 1 - male.wav' },
    { id: '3', name: 'Celecoxib', soundKey: 'Celecoxib 1 - male.wav' },
  ],
  "Antibiotics": [
    { id: '4', name: 'Chloramphenicol', soundKey: 'Chloramphenicol 1 - male.wav' },
  ],
  "Gastrointestinal Drugs": [
    { id: '5', name: 'Diphenoxylate', soundKey: 'Diphenoxylate 1 - male.wav' },
  ],
  "Antifungals": [
    { id: '6', name: 'Famciclovir', soundKey: 'Famciclovir 1 - male.wav' },
    { id: '7', name: 'Fluconazole', soundKey: 'Fluconazole 1 - male.wav' },
  ],
  "Cardiovascular Drugs": [
    { id: '8', name: 'Glyceryl trinitrate', soundKey: 'Glyceryl trinitrate 1 - male.wav' },
  ],
  "Corticosteroids": [
    { id: '9', name: 'Hydrocortisone', soundKey: 'Hydrocortisone 1 - male.wav' },
  ],
  "Respiratory Medications": [
    { id: '10', name: 'Salbutamol', soundKey: 'Salbutamol 1 - male.wav' },
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
