import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  safeView: {
    backgroundColor: '#171717',
    width,
    height,
  },

  main: {
    width: '100%',
    height: '100%',
  },

  gaugeContainer: {
    width: '100%',
    height: 250,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },

  gauge: {
    width: 50,
    height: '100%',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 7,
    padding: 1,
    transform: [{ rotate: '180deg' }],
  },

  appTitle: {
    fontSize: 44,
    textAlign: 'center',
    fontFamily: 'poppins',
    fontWeight: 'bold',
    marginTop: 10,
  },

  gaugeDescription: {
    marginTop: 5,
    textAlign: 'left',
    width: '100%',
    fontSize: 16,
  },

  scaleContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 15,
    flex: 1,
    height: '100%',
  },

  scaleText: {
    color: 'gray',
  },

  decibelsContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15,
    flex: 1,
    height: '100%',
  },

  decibelsText: {
    color: '#fff',
    fontFamily: 'poppins',
    fontWeight: '900',
  },

  container: {
    width: '100%',
  },

  errorText: {
    color: 'red',
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 20,
  },
});
