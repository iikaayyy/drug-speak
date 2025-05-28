import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome5 } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useDispatch } from 'react-redux';
import { markAsLearned } from '../redux/learningSlice';
import { drugData } from '../utils/resource';
import { soundMap } from '../utils/soundMap';

export default function DrugDetailScreen({ route, navigation }) {
  const { drug } = route.params;
  const [selectedSpeed, setSelectedSpeed] = useState('normal');
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [recordedUri, setRecordedUri] = useState(null);
  const [gender, setGender] = useState('male');
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

  const handleStudy = () => {
    dispatch(markAsLearned(drug.name));
    Alert.alert('Success', `${drug.name} marked as learned!`);
    navigation.goBack();
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Microphone Permission Denied');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error('Recording error:', err);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecordedUri(uri);
      setRecording(null);
    } catch (err) {
      console.error('Stop recording error:', err);
    }
  };

  const playRecording = async () => {
    if (!recordedUri) return;

    const { sound } = await Audio.Sound.createAsync({ uri: recordedUri });
    setSound(sound);
    await sound.playAsync();
  };

  const playPreRecorded = async () => {
    try {
      const matched = drugData.find((d) => d.name === drug.name);
      if (!matched || !matched.sounds) return;

      const soundFile = matched.sounds.find((s) => s.gender === gender)?.file;
      if (!soundFile) return;

      const source = soundMap[soundFile];
      if (!source) {
        Alert.alert('Missing Audio', 'Audio file not found in mapping.');
        return;
      }

      const { sound } = await Audio.Sound.createAsync(source);
      setSound(sound);

      // Set playback speed: 0.75 for slow, 1.0 for normal
      await sound.setRateAsync(selectedSpeed === 'slow' ? 0.75 : 1.0, true);
      await sound.playAsync();
    } catch (err) {
      console.error('Audio play error:', err);
      Alert.alert('Playback Error', 'Something went wrong playing the sound.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{drug.name}</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => setGender('male')}>
          <FontAwesome5 name="male" size={40} color={gender === 'male' ? '#3498db' : '#ccc'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGender('female')}>
          <FontAwesome5 name="female" size={40} color={gender === 'female' ? '#e91e63' : '#ccc'} />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Select Speed:</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedSpeed}
          onValueChange={(itemValue) => setSelectedSpeed(itemValue)}
        >
          <Picker.Item label="Normal" value="normal" />
          <Picker.Item label="Slow" value="slow" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.playButton} onPress={playPreRecorded}>
        <Text style={styles.buttonText}>Play AI Pronunciation</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.recordButton}
        onPress={recording ? stopRecording : startRecording}
      >
        <Text style={styles.buttonText}>
          {recording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>

      {recordedUri && (
        <TouchableOpacity style={styles.playButton} onPress={playRecording}>
          <Text style={styles.buttonText}>Play My Recording</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.studyButton} onPress={handleStudy}>
        <Text style={styles.buttonText}>Mark as Learned</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  iconContainer: { flexDirection: 'row', gap: 30, marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 200,
    marginBottom: 20,
    borderRadius: 8,
  },
  recordButton: {
    backgroundColor: '#f39c12',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 10,
  },
  playButton: {
    backgroundColor: '#2980b9',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 10,
  },
  studyButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 18, textAlign: 'center' },
});
