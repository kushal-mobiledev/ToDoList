import {StyleSheet, Dimensions} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppFonts from '../../utils/AppFonts';

const APP_WIDTH = Dimensions.get('screen').width;
const APP_HEIGHT = Dimensions.get('screen').height;

export const HomeStyles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
  },
  mainContainer: {
    width: APP_WIDTH,
    height: APP_HEIGHT,
    backgroundColor: AppColors.background,
  },
  headerStyle: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
  },
  categoryStyle: {
    marginLeft: 15,
    width: '100%',
    height: '5%',
  },
  categoryTextStyle: {
    fontSize: 28,
    fontFamily: AppFonts.regular,
    color: AppColors.darkGray,
  },
  separatorStyle: {
    height: 2,
    width: '100%',
    backgroundColor: AppColors.lightGray,
  },
  categoryListStyle: {
    width: '100%',
    height: '5%',
    marginTop: 10,
  },
  taskListStyle: {
    width: '100%',
    height: '56%',
    backgroundColor: '#F7FFF7',
  },
});
