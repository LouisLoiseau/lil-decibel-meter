import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    width: width * 0.3,
    height: width * 0.3,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },

  innerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 1000,
  },

  buttonText: {
    color: '#000',
  },
});
