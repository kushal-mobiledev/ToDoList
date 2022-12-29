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
    width: '92%',
    height: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    alignItems: 'center',
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
  categoryBtnStyle: {
    marginHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  categoryListTextStyle: {
    fontSize: 20,
    fontFamily: AppFonts.semiBold,
  },
  taskListStyle: {
    width: '95%',
    height: '54%',
    backgroundColor: AppColors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
    alignSelf: 'center',
  },
  taskStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskCheckBoxStyle: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 5,
    marginRight: 15,
  },
  taskTextStyle: {
    fontSize: 26,
    color: AppColors.headerText,
  },
  taskDoneTextStyle: {
    fontSize: 26,
    color: AppColors.red,
    textDecorationLine: 'line-through',
    textDecorationColor: AppColors.red,
  },
});
