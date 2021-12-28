import React, { useEffect } from 'react';
import { DevSettings } from 'react-native';
import Home from './src/screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  useEffect(() => {
    DevSettings.addMenuItem('Purge async storage', () => {
      AsyncStorage.removeItem('readIntro', err => console.log(err));
    });
  }, []);
  return <Home />;
}
