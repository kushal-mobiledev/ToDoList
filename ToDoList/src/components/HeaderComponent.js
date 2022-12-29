import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppColors from '../utils/AppColors';
import AppFonts from '../utils/AppFonts';

const HeaderComponent = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        {props.title}
        <Text style={styles.subTitleText}> {props.subTitle}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 32,
    fontFamily: AppFonts.medium,
    color: AppColors.headerText,
    textAlign: 'center',
    marginLeft: 15,
  },
  subTitleText: {
    fontSize: 32,
    fontFamily: AppFonts.light,
    color: AppColors.selectedCategory,
    textAlign: 'center',
  },
});
export default HeaderComponent;
