import React from 'react';
import { StyleProp, Text as RNText, TextStyle } from 'react-native';
import font from '../utils/font';

interface Props {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export default function Text({ children, style }: Props) {
  return (
    <RNText
      style={[
        {
          fontFamily: font('proxima', 'medium'),
          color: '#fff',
        },
        style && style,
      ]}>
      {children && children}
    </RNText>
  );
}
