const defaultFontName = 'ProximaSoft',
  defaultFontVariant = 'Regular';

type Mapping = {
  [index: string]: string;
};

const fontNameMapping: Mapping = {
  proxima: 'Proxima',
};

const fontStyleMapping: Mapping = {
  italic: 'It',
  '': '',
};

function toFontVariant(name: string) {
  return name.split('-')
    ? name.split('-').map(x => x.charAt(0).toUpperCase())
    : name.charAt(0).toUpperCase();
}

export default function font(
  name: string = defaultFontName,
  variant: string = defaultFontVariant,
  style: string = '',
) {
  return `${fontNameMapping[name]}-${toFontVariant(variant)}${
    fontStyleMapping[style]
  }`;
}
