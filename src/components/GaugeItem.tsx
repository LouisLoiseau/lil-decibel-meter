import React from 'react';
import { View } from 'react-native';

interface Props {
  color: string;
}

export default function GaugeItem({ color }: Props) {
  return (
    <View
      style={{
        backgroundColor: color,
        width: '100%',
        height: '5%',
        borderRadius: 5,
        borderWidth: 2,
      }}
    />
  );
}
