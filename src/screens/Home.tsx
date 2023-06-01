import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import AudioRecorderPlayer, {
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import GaugeItem from '../components/GaugeItem';
import Text from '../components/Text';
import styles from './styles/HomeStyles';
import { getDegrees, generateColorGradient } from '../utils';

const degrees = getDegrees();
const colors = generateColorGradient();
const audioRecorderPlayer = new AudioRecorderPlayer();

export default function Home() {
  const [decibels, setDecibels] = useState<string>('');
  const [gaugeItems, setGaugeItems] = useState<Array<number>>([]);
  useEffect(() => {
    audioRecorderPlayer
      .startRecorder(
        undefined,
        {
          AudioSourceAndroid: AudioSourceAndroidType.CAMCORDER,
        },
        true,
      )
      .catch(err => {
        console.log(err);
      });
    audioRecorderPlayer.setSubscriptionDuration(0.3);
    audioRecorderPlayer.addRecordBackListener(ev => {
      if (ev.currentMetering !== undefined) {
        let value = ev.currentMetering + 100;
        setDecibels(
          Intl.NumberFormat('fr', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(value),
        );
        let items = [];
        for (let i = 0; i < degrees.length; i++) {
          if (value >= degrees[i]) {
            items.push(degrees[i]);
          }
        }
        setGaugeItems(items);
      }
    });
    return () => audioRecorderPlayer.removeRecordBackListener();
  }, []);
  return (
    <SafeAreaView style={styles.safeView} key={'safe-area'}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.main}>
        <View style={styles.container}>
          <Text style={styles.appTitle}>Demibel Ceter</Text>
        </View>
        <View style={styles.gaugeContainer}>
          <View style={styles.decibelsContainer}>
            <Text style={styles.decibelsText}>{decibels} dB</Text>
          </View>
          <View style={styles.gauge}>
            {gaugeItems.map((_, index) => (
              <GaugeItem color={colors[index]} />
            ))}
          </View>
          <View style={styles.scaleContainer}>
            <Text style={styles.scaleText}>{degrees[degrees.length - 1]}</Text>
            <Text style={styles.scaleText}>
              {degrees[Math.floor((degrees.length - 1) / 2)]}
            </Text>
            <Text style={styles.scaleText}>{degrees[0]}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
