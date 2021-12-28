import React, { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  TouchableOpacityBase,
  useWindowDimensions,
  View,
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import GaugeItem from '../components/GaugeItem';
import Text from '../components/Text';
import styles from './styles/HomeStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';

function generateColorGradient(): Array<string> {
  let colorArray = [];
  let n = 100;
  let chunk = 10;
  for (let i = 0; i < n; i++) {
    if (i % chunk === 0) {
      let red = (255 * i) / 100;
      let green = (255 * (100 - i)) / 100;
      let blue = 0;
      colorArray.push(`rgb(${red}, ${green}, ${blue})`);
    }
  }
  return colorArray;
}

function getDegrees(
  step: number = 10,
  min: number = -50,
  max: number = 50,
): Array<number> {
  let decibels = [];
  for (let i = min; i <= max; i += step) {
    decibels.push(i);
  }
  return decibels;
}

const degrees = getDegrees();
const colors = generateColorGradient();
const audioRecorderPlayer = new AudioRecorderPlayer();
export default function Home() {
  useEffect(() => {
    AsyncStorage.getItem('readIntro')
      .then(val => {
        if (val !== null && val === 'true') {
          setHasReadInstructions(true);
        } else {
          setHasReadInstructions(false);
        }
      })
      .catch(err => {});
    return () => {
      audioRecorderPlayer.removeRecordBackListener();
    };
  }, []);
  const [decibels, setDecibels] = useState<number>(0);
  const [gaugeItems, setGaugeItems] = useState<Array<number>>([]);
  const [mode, setMode] = useState<'record' | 'idle'>('idle');
  const [hasReadInstructions, setHasReadInstructions] = useState<boolean>(true);
  function onRecordPress() {
    audioRecorderPlayer
      .startRecorder(undefined, undefined, true)
      .then(() => {
        setMode('record');
      })
      .catch(err => {
        console.log(err);
      });
    audioRecorderPlayer.setSubscriptionDuration(0.1);
    audioRecorderPlayer.addRecordBackListener(ev => {
      if (ev.currentMetering !== undefined && ev.currentMetering !== decibels) {
        setDecibels(ev.currentMetering);
        let items = [];
        for (let i = 0; i < degrees.length; i++) {
          if (ev.currentMetering >= degrees[i]) {
            items.push(degrees[i]);
          }
        }
        setGaugeItems(items);
      }
    });
  }
  return [
    <SafeAreaView style={styles.safeView}>
      {mode === 'idle' && (
        <View style={styles.centeredView}>
          <Button onPress={onRecordPress} title={'Record'} />
        </View>
      )}
      {mode === 'record' && [
        <View>
          <Text style={styles.appTitle}>Demibel Ceter</Text>
          <Text style={styles.gaugeDescription}>
            The gauge show the power of the sound around you.
          </Text>
        </View>,
        <View style={styles.gaugeContainer}>
          <View style={styles.gauge}>
            {gaugeItems.map((item, index) => (
              <GaugeItem color={colors[index]} />
            ))}
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
        </View>,
        <Text>{decibels}</Text>,
      ]}
    </SafeAreaView>,
    <Modal
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
        {/* <Text>
          Press the <Text style={styles.modalRecordText}>record</Text> button
          and a gauge will show how much{' '}
          <Text style={styles.modalDecibelText}>decibels</Text> are ripping your
          ears.
        </Text> */}
        <Text style={styles.modalQuestion}>How to use ?</Text>
        <Text style={styles.modalDisclaimer}>
          Disclaimer : this is not a medical tool.
        </Text>
      </View>
    </Modal>,
  ];
}