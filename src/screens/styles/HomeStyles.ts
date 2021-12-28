import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  safeView: {
    backgroundColor: '#171717',
    width,
    height,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  gaugeContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  gauge: {
    width: 50,
    height: 250,
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
    fontFamily: 'ProximaSoft-Bold',
  },

  modalQuestion: {
    fontFamily: 'ProximaSoft-SemiBold',
    marginTop: 12,
    fontSize: 16,
  },

  modalRecordText: {
    fontFamily: 'ProximaSoft-Bold',
    color: 'crimson',
  },

  modalDecibelText: {
    fontFamily: 'ProximaSoft-Bold',
    color: 'limegreen',
  },

  modalDisclaimer: {
    fontFamily: 'ProximaSoft-Medium',
    fontSize: 11,
  },

  centeredView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  appTitle: {
    fontSize: 34,
    fontFamily: 'ProximaSoft-Bold',
    textAlign: 'center',
  },

  scaleContainer: {
    position: 'absolute',
    left: -30,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 250,
    transform: [{ rotate: '180deg' }],
  },

  scaleText: {
    color: 'lightgray',
  },
});
