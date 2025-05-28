import * as Speech from 'expo-speech';

export function playPronunciation(word, speed = 'normal') {
  const rate = speed === 'slow' ? 0.5 : 1.0;
  Speech.speak(word, {
    rate,
    pitch: 1.0,
    language: 'en',
  });
}
