import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';

const HeaderComponent = props => {
  return <Text style={styles.titleText}>{props.title}</Text>;
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 20,
    color: 'white',
  },
});
export default HeaderComponent;
