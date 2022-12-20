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
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {HomeStyles} from './HomeStyles';
import HeaderComponent from '../../components/HeaderComponent';
import AppColors from '../../utils/AppColors';
import AppFonts from '../../utils/AppFonts';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItem: '',
      selectedCategory: 'Work',
      toDoListArray: [],
      categoryArray: [
        {
          categoryID: 0,
          categoryName: 'Work',
          isSelected: true,
          categoryWiseList: [
            {
              itemID: 0,
              itemName: 'Meeting with Dan',
              isItemDone: false,
            },
            {
              itemID: 1,
              itemName: 'Complete Login module',
              isItemDone: false,
            },
          ],
        },
        {
          categoryID: 1,
          categoryName: 'Shopping',
          isSelected: false,
          categoryWiseList: [
            {
              itemID: 0,
              itemName: 'Buy coffee',
              isItemDone: false,
            },
            {
              itemID: 1,
              itemName: 'Buy Macbook',
              isItemDone: false,
            },
          ],
        },
        {
          categoryID: 2,
          categoryName: 'Home',
          isSelected: false,
          categoryWiseList: [
            {
              itemID: 0,
              itemName: 'Buy decor',
              isItemDone: false,
            },
            {
              itemID: 1,
              itemName: 'Buy Macbook',
              isItemDone: false,
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

  renderCategoryListItem = ({item, index}) => {
    return <View></View>;
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
    return <View style={HomeStyles.separatorStyle} />;
  };

  renderCategory = () => {
    return (
      <View style={HomeStyles.categoryStyle}>
        <Text style={HomeStyles.categoryTextStyle}>Categories</Text>
      </View>
    );
  };

  renderCategoryList = () => {
    return (
      <View style={HomeStyles.categoryListStyle}>
        <ScrollView horizontal>
          {this.state.categoryArray.map(item => {
            return (
              <TouchableOpacity
                key={item.categoryID}
                onPress={() => {
                  this.setState({selectedCategory: item.categoryName});
                  let categoryArr = this.state.categoryArray;
                  categoryArr.forEach(element => {
                    if (item.categoryID === element.categoryID) {
                      element.isSelected = true;
                    } else {
                      element.isSelected = false;
                    }
                  });
                  this.setState({
                    categoryArray: categoryArr,
                  });
                }}
                style={{
                  marginHorizontal: 15,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: item.isSelected
                    ? AppColors.selectedCategory
                    : AppColors.lightGray,
                  paddingHorizontal: 10,
                }}>
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: AppFonts.semiBold,
                      color: item.isSelected
                        ? AppColors.selectedCategory
                        : AppColors.darkGray,
                    }}>
                    {item.categoryName}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {/* <FlatList
          horizontal
          data={this.state.categoryArray}
          extraData={this.state}
          keyExtractor={({item, index}) => index}
          renderItem={this.renderCategoryListItem}
          showsHorizontalScrollIndicator={false}
        /> */}
      </View>
    );
  };

  renderList = () => {
    return (
      <View style={HomeStyles.taskListStyle}>
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
            placeholder={`Add task to ${this.state.selectedCategory}`}
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
          <ScrollView nestedScrollEnabled={true}>
            {this.renderCategory()}
            {this.renderCategoryList()}
            {this.renderList()}
          </ScrollView>
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
