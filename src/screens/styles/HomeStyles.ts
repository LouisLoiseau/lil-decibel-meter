import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  safeView: {
    backgroundColor: '#E6E6FA',
    width,
    height,
  },

  main: {
    width: '100%',
    height: '100%',
    paddingHorizontal: width * 0.1,
  },

  gaugeContainer: {
    width: '100%',
    height: 250,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
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

  modalContainer: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#171717',
  },

  modalContent: {
    backgroundColor: '#171717',
    width: '100%',
    height: '100%',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },

  modalTitle: {
    textAlign: 'center',
    fontSize: 34,
  },

  modalQuestion: {
    marginTop: 12,
    fontSize: 16,
  },

  modalRecordText: {
    color: 'crimson',
  },

  modalDecibelText: {
    color: 'limegreen',
  },

  modalDisclaimer: {
    fontSize: 11,
    marginTop: 10,
    textDecorationLine: 'underline',
  },

  centeredView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  appTitle: {
    fontSize: 44,
    textAlign: 'center',
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
  },

  container: {
    width: '100%',
  },
});
