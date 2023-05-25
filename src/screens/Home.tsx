import React, { useEffect, useState } from 'react';
import { Modal, Platform, SafeAreaView, View } from 'react-native';
import AudioRecorderPlayer, {
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import GaugeItem from '../components/GaugeItem';
import Text from '../components/Text';
import styles from './styles/HomeStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDegrees, generateColorGradient } from '../utils';

const degrees = getDegrees();
const colors = generateColorGradient();
const audioRecorderPlayer = new AudioRecorderPlayer();

export default function Home() {
  const [decibels, setDecibels] = useState<string>('');
  const [gaugeItems, setGaugeItems] = useState<Array<number>>([]);
  const [hasReadInstructions, setHasReadInstructions] =
    useState<boolean>(false);
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
    audioRecorderPlayer.setSubscriptionDuration(0.2);
    audioRecorderPlayer.addRecordBackListener(ev => {
      if (
        ev.currentMetering !== undefined &&
        parseInt((ev.currentMetering * 32767).toFixed(2), 10) !==
          parseInt(decibels, 10)
      ) {
        setDecibels(ev.currentMetering.toString());
        let items = [];
        for (let i = 0; i < degrees.length; i++) {
          if (ev.currentMetering >= degrees[i]) {
            items.push(degrees[i]);
          }
        }
        setGaugeItems(items);
      }
    });
    return () => audioRecorderPlayer.removeRecordBackListener();
  }, []);
  return (
    <>
      <SafeAreaView style={styles.safeView} key={'safe-area'}>
        <View style={styles.main}>
          <View style={styles.container}>
            <Text style={styles.appTitle}>Decibel Meter</Text>
          </View>
          <View style={styles.gaugeContainer}>
            <View style={styles.decibelsContainer}>
              <Text style={styles.decibelsText}>{decibels} dB</Text>
            </View>
            <View style={styles.gauge}>
              {gaugeItems.map((item, index) => (
                <GaugeItem color={colors[index]} />
              ))}
            </View>
            <View style={styles.scaleContainer}>
              <Text style={styles.scaleText}>
                {degrees[degrees.length - 1]}
              </Text>
              <Text style={styles.scaleText}>
                {degrees[Math.floor((degrees.length - 1) / 2)]}
              </Text>
              <Text style={styles.scaleText}>{degrees[0]}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <Modal
        key={'intro-modal'}
        visible={!hasReadInstructions}
        style={styles.modalContainer}
        animationType={'slide'}
        onDismiss={() => {
          AsyncStorage.setItem('readIntro', 'true')
            .then(() => setHasReadInstructions(true))
            .catch(err => console.log(err));
        }}
        onRequestClose={() => {
          AsyncStorage.setItem('readIntro', 'true')
            .then(() => setHasReadInstructions(true))
            .catch(err => console.log(err));
        }}
        presentationStyle={'pageSheet'}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Decibel meter</Text>
          <Text style={styles.modalQuestion}>Wha... what's the point ?</Text>
          <Text>
            The point of this app is very clear: show you how much decibels are
            ripping your ears. On a scale from -50 to 50 decibels, a gauge will
            indicate wether your ears are safe or not.
          </Text>
          <Text>
            Press the <Text style={styles.modalRecordText}>record</Text> button
            and a gauge will show how much{' '}
            <Text style={styles.modalDecibelText}>decibels</Text> are ripping
            your ears.
          </Text>
          <Text style={styles.modalQuestion}>How to use ?</Text>
          <Text>
            {`When you press record, the app will ask to use your microphone${Platform.select(
              { ios: '. ', android: ' and to store files in your storage. ' },
            )}`}
            You'll need to accept for the app to work. Then a gauge will appear
            with useful information about decibels.
          </Text>
          <Text style={styles.modalDisclaimer}>
            Disclaimer : this is not a medical tool.
          </Text>
        </View>
      </Modal>
    </>
  );
}
