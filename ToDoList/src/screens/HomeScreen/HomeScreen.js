import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import {HomeStyles} from './HomeStyles';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={styles.rootContainer}>
        <Text style={HomeStyles.textStyle}>Home Screen</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {},
});

export default HomeScreen;
