import { Dimensions, StyleSheet } from 'react-native';
import font from '../../utils/font';

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
    paddingHorizontal: width * 0.1,
  },

  gaugeContainer: {
    width: '100%',
    height: 250,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 75,
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

  gaugeDescription: {
    fontFamily: font('proxima', 'medium'),
    marginTop: 5,
    textAlign: 'left',
    width: '100%',
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
    fontFamily: font('proxima', 'medium'),
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
    fontFamily: font('proxima', 'bold'),
  },

  container: {
    width: '100%',
  },
});
