import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {HomeStyles} from './HomeStyles';
import HeaderComponent from '../../components/HeaderComponent';
import AppColors from '../../utils/AppColors';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItem: '',
      toDoListArray: [],
      categoryArray: [
        {
          categoryID: 0,
          categoryName: 'Work',
          categoryWiseList: [
            {
              itemID: 0,
              itemName: 'Meeting with Dan',
            },
            {
              itemID: 1,
              itemName: 'Complete Login module',
            },
          ],
        },
        {
          categoryID: 1,
          categoryName: 'Shopping',
          categoryWiseList: [
            {
              itemID: 0,
              itemName: 'Buy coffee',
            },
            {
              itemID: 1,
              itemName: 'Buy Macbook',
            },
          ],
        },
      ],
    };
  }

  onClickAddCategories = () => {};

  renderHeader = () => {
    return (
      <View style={HomeStyles.headerStyle}>
        <HeaderComponent
          title="Tasks"
          subTitle="List"
          onAddCategoriesClick={this.onClickAddCategories}
        />
      </View>
    );
  };

  renderToDoItem = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: index % 2 === 0 ? 'white' : 'pink',
          borderBottomRightRadius: index % 2 === 0 ? 20 : 0,
          borderTopLeftRadius: index % 2 === 0 ? 0 : 20,
        }}
        key={index}>
        <TouchableOpacity
          onPress={() => {
            if (this.state.toDoListArray.length !== 0) {
              let arr = this.state.toDoListArray.filter(
                newItem => newItem !== item,
              );
              // let newIndex = this.state.toDoListArray.indexOf(item);
              // let arr = this.state.toDoListArray.splice(newIndex, 0);
              this.setState({toDoListArray: arr});
            }
          }}>
          <Text
            style={{
              fontSize: 26,
              color: index % 2 === 0 ? 'teal' : 'white',
            }}>
            {index + 1} - {item}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: AppColors.lightGray,
        }}
      />
    );
  };

  renderCategory = () => {
    return (
      <View style={HomeStyles.categoryStyle}>
        <Text style={HomeStyles.categoryTextStyle}>Categories</Text>
      </View>
    );
  };

  renderList = () => {
    return (
      <View
        style={{
          width: '100%',
          height: '73%',
          backgroundColor: '#F7FFF7',
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
    console.log(item + '-' + index);
    if (this.state.toDoListArray.length !== 0) {
      let arr = this.state.toDoListArray.filter(newItem => newItem !== item);
      // let newIndex = this.state.toDoListArray.indexOf(item);
      // let arr = this.state.toDoListArray.splice(newIndex, 0);
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
        <StatusBar hidden />
        <View style={HomeStyles.mainContainer}>
          {this.renderHeader()}
          {this.renderCategory()}
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
    backgroundColor: 'black',
  },
});

export default HomeScreen;
