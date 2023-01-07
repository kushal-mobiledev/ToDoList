import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Keyboard,
  Modal,
  Alert,
} from 'react-native';
import {HomeStyles} from './HomeStyles';
import HeaderComponent from '../../components/HeaderComponent';
import AppColors from '../../utils/AppColors';
import AppFonts from '../../utils/AppFonts';
import AppImage from '../../utils/AppImage';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItem: '',
      categoryItem: '',
      selectedCategoryIndex: 0,
      selectedCategory: 'Work',
      isModalVisible: false,
      categoryArray: [
        {
          categoryID: 0,
          categoryName: 'Work',
          isSelected: true,
          categoryWiseList: [],
        },
        {
          categoryID: 1,
          categoryName: 'Shopping',
          isSelected: false,
          categoryWiseList: [],
        },
      ],
    };
  }

  saveCategory = () => {
    const {categoryArray} = this.state;

    if (this.state.categoryItem !== '') {
      let newCategory = categoryArray;

      const addToDoObj = {
        categoryID: newCategory.length,
        categoryName: this.state.categoryItem,
        isSelected: false,
        categoryWiseList: [],
      };
      newCategory.push(addToDoObj);

      this.setState(
        {
          categoryArray: newCategory,
          isModalVisible: false,
          categoryItem: '',
        },
        () => {
          // save updated list to async storage
          this.saveListToAsyncStorage();
        },
      );
    } else {
      Alert.alert('Empty field!', 'Please add category.');
    }
  };

  saveListToAsyncStorage = () => {
    const jsonValue = JSON.stringify(this.state.categoryArray);
    AsyncStorage.setItem('@TODO_CategoryArray', jsonValue)
      .then(isSuccess => {})
      .catch(err => {
        Alert.alert(
          'Error!',
          'Something went wrong while saving your data. Please retry.',
        );
      });
  };

  onClickAddCategories = () => {
    this.setState({isModalVisible: true});
  };

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

  renderCategory = () => {
    return (
      <View style={HomeStyles.categoryStyle}>
        <Text style={HomeStyles.categoryTextStyle}>Categories</Text>
        <TouchableOpacity onPress={this.onClickAddCategories}>
          <Image source={AppImage.addCategory} style={HomeStyles.imgStyle} />
        </TouchableOpacity>
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
                key={'TODO' + item.categoryID}
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
                  backgroundColor: item.isSelected
                    ? AppColors.selectedCategory
                    : AppColors.transparent,
                  borderColor: item.isSelected
                    ? AppColors.selectedCategory
                    : AppColors.lightGray,
                }}>
                <View>
                  <Text
                    style={{
                      ...HomeStyles.categoryListTextStyle,
                      color: item.isSelected
                        ? AppColors.white
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

  componentDidMount() {
    // TODO: Retrieve list from async storage
    this.retrieveListFromAsyncStorage();
  }

  retrieveListFromAsyncStorage = () => {
    AsyncStorage.getItem('@TODO_CategoryArray')
      .then(value => {
        if (value !== null) {
          const jsonValue = JSON.parse(value);

          // first category should be selected by default
          let categoryArr = jsonValue;
          categoryArr.forEach(element => {
            if (element.categoryID === 0) {
              element.isSelected = true;
            } else {
              element.isSelected = false;
            }
          });
          this.setState({
            categoryArray: categoryArr,
            selectedCategoryIndex: 0,
            selectedCategory: 'Work',
          });
        }
      })
      .catch(err => {
        alert('Something went wrong while retrieving list!');
      });
  };

  renderList = () => {
    const {selectedCategoryIndex} = this.state;
    return (
      <View style={HomeStyles.taskListStyle}>
        <ScrollView nestedScrollEnabled>
          {this.state.categoryArray.map((item, index) => {
            if (index === this.state.selectedCategoryIndex) {
              if (item.categoryWiseList.length === 0) {
                return (
                  <Text style={HomeStyles.noTaskStyle}>No tasks to show</Text>
                );
              } else {
                return (
                  <View
                    key={'Category' + item.categoryID}
                    style={{marginTop: 20, marginLeft: 20}}>
                    {item.categoryWiseList.map((todoItem, todoIndex) => {
                      return (
                        <TouchableOpacity
                          key={'TODO' + todoItem.itemID}
                          onPress={() => {
                            if (item.categoryWiseList.length !== 0) {
                              let categoryArr = this.state.categoryArray;
                              let newCategory =
                                categoryArr[selectedCategoryIndex]
                                  .categoryWiseList;
                              newCategory[todoIndex].isItemDone = true;
                              console.log(JSON.stringify(categoryArr));
                              this.setState({categoryArray: categoryArr});
                            }
                          }}>
                          <View style={HomeStyles.taskStyle}>
                            <View style={HomeStyles.taskCheckBoxStyle} />
                            <Text
                              key={'TODO' + todoIndex}
                              style={
                                todoItem.isItemDone
                                  ? HomeStyles.taskDoneTextStyle
                                  : HomeStyles.taskTextStyle
                              }>
                              {todoItem.itemName}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                );
              }
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
      let newToDoItem = categoryArr[selectedCategoryIndex].categoryWiseList;

      const addToDoObj = {
        itemID: newToDoItem.length,
        itemName: todoItem,
        isItemDone: false,
      };
      newToDoItem.push(addToDoObj);

      this.setState({todoItem: '', categoryArray: categoryArr}, () => {
        // save updated list to async storage
        this.saveListToAsyncStorage();
      });
      Keyboard.dismiss();
    } else {
      Alert.alert('Empty field!', 'Please add task.');
    }
  };

  renderInput = () => {
    return (
      <View style={HomeStyles.taskTextInputContainer}>
        <View style={{width: '90%', flexDirection: 'row'}}>
          <TextInput
            style={HomeStyles.taskTextInput}
            cursorColor={AppColors.selectedCategory}
            placeholder={`Add task to ${this.state.selectedCategory}`}
            placeholderTextColor={AppColors.gray}
            value={this.state.todoItem}
            onChangeText={text => this.setState({todoItem: text})}
            onSubmitEditing={this.saveItemToList}
          />

          <TouchableOpacity
            style={HomeStyles.taskAddBtn}
            onPress={this.saveItemToList}>
            <Image source={AppImage.plus} style={HomeStyles.imgStyle} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  dismissModal = () => {
    this.setState({isModalVisible: false});
  };

  renderModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
        onRequestClose={() => {
          this.setState({isModalVisible: !this.state.isModalVisible});
        }}>
        <TouchableOpacity
          style={styles.centeredView}
          onPressOut={this.dismissModal}>
          <View style={styles.modalView}>
            <Text style={styles.titleText}>
              Add
              <Text style={styles.subTitleText}> Category</Text>
            </Text>
            <View style={HomeStyles.modalTextInputContainer}>
              <View style={{width: '90%', flexDirection: 'row'}}>
                <TextInput
                  style={HomeStyles.modalTextInputStyle}
                  cursorColor={AppColors.selectedCategory}
                  autoFocus
                  value={this.state.categoryItem}
                  onChangeText={text => this.setState({categoryItem: text})}
                  onSubmitEditing={this.saveCategory}
                />

                <TouchableOpacity
                  style={HomeStyles.modalAddBtn}
                  onPress={this.saveCategory}>
                  <Image source={AppImage.plus} style={HomeStyles.imgStyle} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.rootContainer}>
        <StatusBar hidden />
        {this.renderHeader()}
        {this.renderModal()}
        <View style={HomeStyles.mainContainer}>
          {this.renderCategory()}
          {this.renderCategoryList()}
          {this.renderInput()}
          {this.renderList()}
        </View>
        {/* </KeyboardAvoidingView> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  titleText: {
    fontSize: 32,
    fontFamily: AppFonts.medium,
    color: AppColors.headerText,
  },
  subTitleText: {
    fontSize: 32,
    fontFamily: AppFonts.light,
    color: AppColors.selectedCategory,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: AppColors.background,
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default HomeScreen;
