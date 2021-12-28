import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import styles from './styles/ButtonStyles';
import Text from './Text';

interface Props {
  style?: StyleProp<ViewStyle>;
  title?: string;
  onPress?: () => void;
  children?: React.ReactNode;
}

export default function Button({ style, title, onPress, children }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress ? onPress : () => {}}
      style={[styles.container, style && style]}>
      <View style={styles.innerContainer}>
        {title && <Text style={styles.buttonText}>{title}</Text>}
        {children && children}
      </View>
    </TouchableOpacity>
  );
}
