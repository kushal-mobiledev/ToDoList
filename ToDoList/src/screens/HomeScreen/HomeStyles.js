import {StyleSheet} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppFonts from '../../utils/AppFonts';

export const HomeStyles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
  },
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: AppColors.background,
  },
  headerStyle: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
  },
  categoryStyle: {
    marginLeft: 20,
    width: '100%',
    height: '5%',
  },
  categoryTextStyle: {
    fontSize: 28,
    fontFamily: AppFonts.regular,
    color: AppColors.darkGray,
  },
});
