import { Platform } from 'react-native';

const defaultFontName = 'ProximaSoft',
  defaultFontVariant = 'Regular';

type Mapping = {
  [index: string]: string;
};

const fontNameMapping: Mapping = {
  proxima: Platform.select({
    android: 'proximasoft',
    ios: 'ProximaSoft',
    default: 'ProximaSoft',
  }),
};

const fontStyleMapping: Mapping = {
  italic: 'It',
  '': '',
};

function toFontVariant(name: string) {
  return name.charAt(0).toUpperCase() + name.substring(1, name.length);
}

export default function font(
  name: string = defaultFontName,
  variant: string = defaultFontVariant,
  style: string = '',
) {
  return `${fontNameMapping[name]}${Platform.select({
    ios: '-',
    android: '_',
  })}${toFontVariant(variant)}${fontStyleMapping[style]}`;
}
