import React from 'react';
import { StyleProp, Text as RNText, TextStyle } from 'react-native';

interface Props {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export default function Text({ children, style }: Props) {
  return (
    <RNText
      style={[
        {
          color: '#fff',
        },
        style && style,
      ]}>
      {children && children}
    </RNText>
  );
}
