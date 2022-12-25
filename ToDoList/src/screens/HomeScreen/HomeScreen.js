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
  Platform,
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
      selectedCategoryIndex: 0,
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
              isItemDone: true,
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
          title="ToDo"
          subTitle="List"
          onAddCategoriesClick={this.onClickAddCategories}
        />
      </View>
    );
  };

  renderCategoryListItem = ({item, index}) => {
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
        <ScrollView horizontal nestedScrollEnabled>
          {this.state.categoryArray.map((item, index) => {
            return (
              <TouchableOpacity
                key={item.categoryID}
                onPress={() => {
                  this.setState({
                    selectedCategory: item.categoryName,
                    selectedCategoryIndex: index,
                  });
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
                  ...HomeStyles.categoryBtnStyle,
                  borderColor: item.isSelected
                    ? AppColors.selectedCategory
                    : AppColors.lightGray,
                }}>
                <View>
                  <Text
                    style={{
                      ...HomeStyles.categoryListTextStyle,
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
      </View>
    );
  };

  componentDidMount() {}

  renderList = () => {
    const {selectedCategoryIndex} = this.state;
    return (
      <View style={HomeStyles.taskListStyle}>
        <ScrollView nestedScrollEnabled>
          {this.state.categoryArray.map((item, index) => {
            if (index === this.state.selectedCategoryIndex) {
              return (
                <View key={'Category' + item.categoryID}>
                  {item.categoryWiseList.map((todoItem, todoIndex) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          if (item.categoryWiseList.length !== 0) {
                            let categoryArr = this.state.categoryArray;
                            let newCategory =
                              categoryArr[selectedCategoryIndex]
                                .categoryWiseList;
                            newCategory[todoIndex].isItemDone = true;
                            console.log(JSON.stringify(categoryArr));
                            this.setState({categoryArray: categoryArr}, () => {
                              this.forceUpdate();
                            });
                          }
                        }}>
                        <View style={HomeStyles.taskStyle}>
                          <View style={HomeStyles.taskCheckBoxStyle} />
                          <Text
                            key={'TODO' + todoIndex}
                            style={{
                              color: item.isItemDone
                                ? 'red'
                                : AppColors.headerText,
                            }}>
                            {todoItem.itemName} -{' '}
                            {item.isItemDone ? 'true' : 'false'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            }
          })}
        </ScrollView>
      </View>
    );
  };

  saveItemToList = () => {
    const {categoryArray, selectedCategoryIndex, todoItem} = this.state;
    if (todoItem !== '') {
      let categoryArr = categoryArray;
      let newCategory = categoryArr[selectedCategoryIndex].categoryWiseList;

      const addToDoObj = {
        itemID: newCategory.length,
        itemName: todoItem,
        isItemDone: false,
      };
      newCategory.push(addToDoObj);

      console.log('UPDATED OBJ: ' + JSON.stringify(categoryArr));

      this.setState({todoItem: '', categoryArray: categoryArr});
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <StatusBar hidden />
          {this.renderHeader()}

          <View style={HomeStyles.mainContainer}>
            <ScrollView contentContainerStyle={{flex: 1}}>
              {this.renderCategory()}
              {this.renderCategoryList()}
              {this.renderList()}
              {this.renderInput()}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
});

export default HomeScreen;
