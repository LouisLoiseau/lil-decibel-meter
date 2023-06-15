import React, { useCallback, useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
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
  const [error, setError] = useState<string | null>(null);
  const [decibels, setDecibels] = useState<string>('');
  const [gaugeItems, setGaugeItems] = useState<Array<number>>([]);
  const checkPermissions = async () => {
    let granted: boolean = true;
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
        if (
          !grants['android.permission.RECORD_AUDIO'] ||
          !grants['android.permission.WRITE_EXTERNAL_STORAGE'] ||
          !grants['android.permission.READ_EXTERNAL_STORAGE']
        ) {
          granted = false;
        }
      } catch (err) {
        granted = false;
      }
    }

    return granted;
  };
  const record = useCallback(async () => {
    const granted = await checkPermissions();
    if (!granted) {
      setError('Please grant all permissions.');
      return;
    }
    audioRecorderPlayer
      .startRecorder(
        undefined,
        {
          AudioSourceAndroid: AudioSourceAndroidType.MIC,
        },
        true,
      )
      .catch(_err => {
        setError('An error occurred with the recorder.');
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
  }, []);
  useEffect(() => {
    record();
    return () => {
      audioRecorderPlayer.removeRecordBackListener();
    };
  }, [record]);
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
              <GaugeItem color={colors[index]} key={index} />
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
        <Text style={styles.errorText}>{error}</Text>
      </View>
    </SafeAreaView>
  );
}
