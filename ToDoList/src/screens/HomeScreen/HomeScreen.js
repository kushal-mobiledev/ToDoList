import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {HomeStyles} from './HomeStyles';
import HeaderComponent from '../../components/HeaderComponent';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItem: '',
      toDoListArray: [],
    };
  }

  renderHeader = () => {
    return (
      <View
        style={{
          width: '100%',
          height: '10%',
          justifyContent: 'center',
          borderBottomWidth: 1,
          borderBottomColor: 'white',
        }}>
        <HeaderComponent title="ToDo List" />
      </View>
    );
  };

  renderToDoItem = ({item, index}) => {
    return (
      <View style={{marginBottom: 10, marginHorizontal: 20}}>
        <TouchableOpacity onPress={this.removeItemFromList}>
          <Text style={{fontSize: 26, color: 'white'}}>
            {index + 1} - {item}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderList = () => {
    return (
      <View
        style={{
          width: '100%',
          height: '78%',
          backgroundColor: 'teal',
        }}>
        <FlatList
          data={this.state.toDoListArray}
          extraData={this.state}
          keyExtractor={({item, index}) => index}
          renderItem={this.renderToDoItem}
        />
      </View>
    );
  };

  saveItemToList = () => {
    if (this.state.todoItem !== '') {
      let arr = this.state.toDoListArray;
      arr.push(this.state.todoItem);
      this.setState({todoItem: '', toDoListArray: arr});
    }
  };

  removeItemFromList = ({item, index}) => {
    if (this.state.toDoListArray.length !== 0) {
      // let arr = this.state.toDoListArray.filter(newItem => newItem === item);
      let arr = this.state.toDoListArray.splice(index, 1);
      this.setState({toDoListArray: arr});
    }
  };

  renderInput = () => {
    return (
      <View
        style={{
          width: '100%',
          height: '12%',
          backgroundColor: 'teal',
          justifyContent: 'center',
          borderTopWidth: 1,
          borderTopColor: 'white',
        }}>
        <View style={{width: '80%', flexDirection: 'row'}}>
          <TextInput
            style={{
              fontSize: 22,
              width: '90%',
              backgroundColor: 'white',
              marginHorizontal: 20,
              borderRadius: 10,
            }}
            placeholder="Enter a Task"
            value={this.state.todoItem}
            onChangeText={text => this.setState({todoItem: text})}
          />

          <TouchableOpacity
            style={{width: '10%', justifyContent: 'center', height: '100%'}}
            onPress={this.saveItemToList}>
            <View
              style={{
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 22,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                +
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.rootContainer}>
        <View style={HomeStyles.mainContainer}>
          {this.renderHeader()}
          {this.renderList()}
          {this.renderInput()}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'teal',
  },
});

export default HomeScreen;
