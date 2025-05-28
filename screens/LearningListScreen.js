import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function LearningListScreen() {

  const learnedDrugs = useSelector((state) => state.learning.completedDrugs || []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learned Drugs</Text>
      {learnedDrugs.length === 0 ? (
        <Text style={styles.empty}>You haven't studied any drugs yet.</Text>
      ) : (
        <FlatList
          data={learnedDrugs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' },
  empty: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 50 },
  item: {
    padding: 15,
    backgroundColor: '#d0f0c0',
    marginBottom: 10,
    borderRadius: 6,
  },
  itemText: { fontSize: 18 },
});
