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
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Modal,
} from 'react-native';
import {HomeStyles} from './HomeStyles';
import HeaderComponent from '../../components/HeaderComponent';
import AppColors from '../../utils/AppColors';
import AppFonts from '../../utils/AppFonts';
import AppImage from '../../utils/AppImage';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItem: '',
      categoryItem: '',
      selectedCategoryIndex: 0,
      selectedCategory: 'Work',
      isModalVisible: false,
      toDoListArray: [],
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
        {
          categoryID: 2,
          categoryName: 'Home',
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

      this.setState({
        categoryArray: newCategory,
        isModalVisible: false,
        categoryItem: '',
      });
    }
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

  renderCategory = () => {
    return (
      <View style={HomeStyles.categoryStyle}>
        <Text style={HomeStyles.categoryTextStyle}>Categories</Text>
        <TouchableOpacity onPress={this.onClickAddCategories}>
          <Image
            source={AppImage.addCategory}
            style={{width: 32, height: 32}}
          />
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

      console.log('UPDATED OBJ: ' + JSON.stringify(categoryArr));

      this.setState({todoItem: '', categoryArray: categoryArr});
      Keyboard.dismiss();
    }
  };

  renderInput = () => {
    return (
      <View
        style={{
          width: '100%',
          height: '12%',
          justifyContent: 'center',
        }}>
        <View style={{width: '90%', flexDirection: 'row'}}>
          <TextInput
            style={{
              fontSize: 22,
              width: '87%',
              backgroundColor: 'white',
              marginHorizontal: 15,
              borderRadius: 10,
            }}
            placeholder={`Add task to ${this.state.selectedCategory}`}
            value={this.state.todoItem}
            onChangeText={text => this.setState({todoItem: text})}
            onSubmitEditing={this.saveItemToList}
          />

          <TouchableOpacity
            style={{
              width: '10%',
              justifyContent: 'center',
              height: '100%',
              marginRight: 20,
            }}
            onPress={this.saveItemToList}>
            <Image source={AppImage.plus} style={{width: 32, height: 32}} />
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
              <Text style={styles.subTitleText}> Categories</Text>
            </Text>
            <View
              style={{
                marginTop: 20,
                width: '100%',
                height: '30%',
                justifyContent: 'center',
              }}>
              <View style={{width: '90%', flexDirection: 'row'}}>
                <TextInput
                  style={{
                    fontSize: 22,
                    width: '87%',
                    backgroundColor: 'white',
                    marginHorizontal: 15,
                    borderRadius: 10,
                  }}
                  autoFocus
                  placeholder={'Add category'}
                  value={this.state.categoryItem}
                  onChangeText={text => this.setState({categoryItem: text})}
                  onSubmitEditing={this.saveCategory}
                />

                <TouchableOpacity
                  style={{
                    width: '10%',
                    justifyContent: 'center',
                    height: '100%',
                    marginRight: 20,
                  }}
                  onPress={this.saveCategory}>
                  <Image
                    source={AppImage.plus}
                    style={{width: 32, height: 32}}
                  />
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
    backgroundColor: AppColors.white,
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
