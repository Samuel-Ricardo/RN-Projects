/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 28/09/18.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground, Image, ListView, Platform, ActivityIndicator, InteractionManager } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import KeyboardManager from 'react-native-keyboard-manager';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionSetBudgetCategories, actionSetTotalAmount } from '../actions/Budget.action';
import fixStyles, { colors } from '../styles/index.style';
import { getHeightByPerc, getWidthByPerc } from '../styles/StyleUtils.style';
import BudgetListComponent from '../components/BudgetList.component';
import { serviceUpdateBudget } from '../services/Home.service';
import KeyboardShift from '../components/keyboard.component';
import { AsyncStorage } from 'react-native';



class Edit extends React.PureComponent {
    static navigatorStyle = {
        statusBarColor: 'transparent',
        statusBarTextColorScheme: 'light',
        navBarHidden: true,
        drawUnderStatusBar: true
    };

    constructor(props) {
        super(props);


        console.log("")
        console.log("Props to edit")
        console.log("")
        console.log(props)
        console.log("")

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
        

        this.state = {
            dataSource: ds.cloneWithRows([]),
            categories: [],
            spendable_index: 0,
            spendable_percentage: 0,
            spendable_amount: 0,
            max_percentage: 0,
            max_amount: 0,
            is_working: false,
            interactionsComplete: false,
            user: null
        };

        this._handleNextButton = this._handleNextButton.bind(this);
        this._addExpense = this._addExpense.bind(this);
        this._handleLockPress = this._handleLockPress.bind(this);
        this._handleTextChange = this._handleTextChange.bind(this);
        this._handleTotalAmountChange = this._handleTotalAmountChange.bind(this);
        this._handleUpdateBudget = this._handleUpdateBudget.bind(this);
        this._handleBackButton = this._handleBackButton.bind(this);
        this._handleResetButton = this._handleResetButton.bind(this);
        this._handleShowNotification = this._handleShowNotification.bind(this);
        this._callNotificationMethod = _.debounce(this._handleShowNotification, 500);


        AsyncStorage.getItem('auth_user').then(data => {


            const user = JSON.parse(data)



            console.log("")
            console.log("Get User to edit budget")
            console.log("")
            console.log(user)
            console.log("")

            this.setState({user})

            console.log("")
            console.log("Get User from state edit")
            console.log("")
            console.log(this.state.user)
            console.log("")

        })

    }

    componentDidMount() {
        if(Platform.OS == 'ios') {
            KeyboardManager.setEnable(true);
            KeyboardManager.setEnableAutoToolbar(true);
        }

        InteractionManager.runAfterInteractions(() => {
            let tempSpendIndex = 0;
            //this.props.budget_categories.some((val) => {
                this.props.budget_categories.some((val) => {
                console.log('edit component - ',val);
                if (val.title.toLowerCase() == 'spendable') {
                    this.setState({ spendable_percentage: val.percentage,
                        spendable_amount: val.amount,
                        max_percentage: val.percentage,
                        max_amount: val.amount,
                    });
                    return true;
                }
                tempSpendIndex++;
            });
            //change spendable to locked
            const tempData = this.props.budget_categories;///perae
            if(tempData.length >= tempSpendIndex) {
                tempData[tempSpendIndex].is_locked = true            }
            this.setState(
                {
                    categories: tempData, spendable_index: tempSpendIndex, interactionsComplete: true

                }, () => {

                this.setState(
                    {
                        dataSource: this.state.dataSource.cloneWithRows(this.state.categories)
                    });
            });
        });
    }


    _handleNextButton() {
        this.props.navigator.resetTo({
            screen: 'survey.Home',
            navigatorStyle: {
                navBarHidden: true
            }
        });
    }
    _handleBackButton() {
        this.props.navigator.pop({
            animated: true,
            animationType: 'slide-horizontal',
        });
    }
    _handleUpdateBudget() {

        const auth_token = "Bearer " + this.state.user.authenticationToken

        console.log(this.state.categories);
        this.setState({ is_working: true });
        serviceUpdateBudget(
            {
                categories: this.state.categories,
                total_amount: this.props.budget_total

            },{ Authorization: auth_token }).then((data) => {


            this.setState({ is_working: false });

            if (!data.error) {


                console.log ("")
                console.log ("data from service")
                console.log ("")
                console.log(data.data)
                console.log("")
                console.log("Total Amount")
                console.log(data.data.total_amount)
                console.log(" ")
                console.log(" Categories")
                console.log(" ")
                console.log(data.data.categories)
                console.log("Samukael 2: ")
                
                

                //this.props.actionSetTotalAmount(data.data.total_amount);

                //this.props.actionSetBudgetCategories(data.data.categories);
                this.props.actionSetTotalAmount(data.data.total_amount);

                this.props.actionSetBudgetCategories(data.data.categories);


                console.log ("")
                console.log ("data from service")
                console.log ("")
                console.log(data.data)
                console.log("")
                console.log("Total Amount")
                console.log(data.data.total_amount)
                console.log(" ")
                console.log(" Categories")
                console.log(" ")
                console.log(data.data.categories) 
                console.log("Samukael 2: ")
                
                this.props.navigator.resetTo({
                    screen: 'survey.Result',
                    navigatorStyle: {
                        navBarHidden: true
                    }
                });
            }
        });
    }
    _handleShowNotification(text) {
        this.props.navigator.showInAppNotification({
            screen: 'survey.Notification',
            passProps: { text: text },
            autoDismissTimerSec: 1,
        })
    }

    _handleTotalAmountChange(tempText) {

        var reg = new RegExp(/^\d+$/)

        if(reg.test(tempText) || tempText == '' ) {

            const text = tempText ? tempText : 0;

            this.props.actionSetTotalAmount(parseInt(text));

            const tempTotalAmount = parseInt(text);

            const tempData = this.state.categories.map((val, key) => {

                const tempPercentage = parseInt(val.percentage);
                const tempAmount = ((tempTotalAmount * tempPercentage / ( 100))).toFixed(2);

                return {...val, amount: tempAmount};
            });

            const temp = tempData[this.state.spendable_index];

            this.setState(
            {
                categories: tempData,
                dataSource: this.state.dataSource.cloneWithRows(tempData),
                max_amount: temp.amount,
                max_percentage: temp.percentage,
            });
        }
    }
    _handleResetButton () {
        this.props.navigator.resetTo({
            screen: 'survey.Home',
            navigatorStyle: {
                navBarHidden: true
            }
        });
    }
    _addExpense() {

        const tempObj =  {

            id: Date.now(),
            percentage: 0,
            is_locked: false,
            title: '',
            amount: 0,
            is_new: true,
        };

        const temp = this.state.categories;
        temp.push(tempObj);

        console.log("")
        console.log("Expense added")
        console.log("")
        console.log(tempObj)
        console.log("")
        console.log("Total Expenses")
        console.log("")
        console.log(temp)

        this.setState(
            { 
                categories: temp,
                dataSource: this.state.dataSource.cloneWithRows(temp)
            });

        console.log("")
        console.log("Total Expenses Saved")
        console.log("")
        console.log(this.setState.categories)
    }
    _handleTextChange(type, tempText, rowId) {

        console.log('Edit Screen text input change');
        console.log(type, tempText, rowId);

        const tempTotal = this.props.budget_total;

        if (type && rowId) {

            const text = tempText ? tempText : 0;
            let tempDiff = { percentage: 0, amount: 0 };

            const tempData = this.state.categories.map((val, key) => {

                if (key == rowId) {

                    if (type == 'percentage') {

                        const tempPerc = parseInt(text);
                        tempDiff.percentage = tempPerc - val.percentage ;

                        const tempAmount = ((tempTotal * tempPerc / ( 100))).toFixed(2);
                        console.log('tempAmount', tempAmount);
                        tempDiff.amount = tempAmount - val.amount;

                        return { ...val, percentage: parseInt(text), amount: tempAmount };

                    } else if (type == 'title') {
                        return {...val, title: text};
                    } else if (type == 'amount') {
                        const tempAmount = parseInt(text)
                        tempDiff.amount = (tempAmount - val.amount).toFixed(2) ;

                        const tempPercetage = ((tempAmount * 100 / tempTotal)).toFixed(2);
                        tempDiff.percentage = tempPercetage - val.percentage;

                        return {...val, amount: parseInt(text), percentage: tempPercetage};
                    }
                }
                return val;
            });
            const temp = tempData[this.state.spendable_index];
            const tempPercentage = temp.percentage - (tempDiff.percentage);
            const tempAmount = (temp.amount - (tempDiff.amount)).toFixed(2);
            tempData[this.state.spendable_index] = {
                ...temp,
                percentage: tempPercentage,
                amount: tempAmount,
            };
            this.setState({categories: tempData,
                dataSource: this.state.dataSource.cloneWithRows(tempData),
                max_amount: tempAmount,
                max_percentage: tempPercentage,

            })
        }
    }

    _handleLockPress(rowId) {
        const tempData = this.state.categories.map((val, key) => {
            if(key == rowId && rowId != this.state.spendable_index) {
                return { ...val, is_locked: !val.is_locked };
            } return val;
        });
        this.setState({ categories: tempData, dataSource: this.state.dataSource.cloneWithRows(tempData) });
    }
    _renderUpdateButtonContent() {
        if(!this.state.is_working) {
            return (<Text style={[fixStyles.fontContainer, styles.buttonStyle, { fontWeight: 'bold', color: colors.white}  ]}>UPDATE BUDGET</Text>)
        } else {
            return (<ActivityIndicator />)
        }
    }
    _renderContent() {
        if(this.state.interactionsComplete) {
            return (    <KeyboardShift style={{flex: 1}}>
                <View style={styles.mainContainer}>
                    <View style={[styles.flexRow, { alignItems: 'center'}]}>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={this._handleBackButton}>
                                <Image source={require('../resources/ic_back.png')}
                                       style={{width: 20, height: 15, marginRight: 10}}/>
                            </TouchableOpacity>
                            <Text style={[fixStyles.fontContainer, styles.whiteColor, {fontSize: 14}]}>
                                Adjust Budget
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={this._handleResetButton}
                                              style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={[fixStyles.fontContainer, {
                                    color: colors.white,
                                    fontSize: 14,
                                    marginLeft: 5
                                }]}>
                                    Reset
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{height: 110, marginVertical: 10}}>
                        <View style={[ {flex: 1, alignItems: 'center' }]}>
                            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={[fixStyles.fontContainer, styles.whiteColor, {fontSize: 36}]}>
                                    $
                                </Text>
                                <TextInput style={styles.budgetInput} value={`${this.props.budget_total}`}
                                           onChangeText={this._handleTotalAmountChange} keyboardType="numeric"/>
                            </View>

                        </View>
                        <View style={{flex: 1, marginTop: 5, alignItems: 'center' }}>
                            <Text style={[fixStyles.fontContainer, styles.whiteColor, { fontSize: 14, fontWeight: 'bold' }]}>
                                In total
                            </Text>
                        </View>
                    </View>
                    <View style={{marginTop: 10, flex: 1}}>
                        <View style={[styles.borderStyle, {
                            flex: 1,
                            backgroundColor: colors.white,
                            paddingVertical: 10,
                            paddingHorizontal: 10
                        }]}>
                            <BudgetListComponent
                                dataSource={this.state.dataSource}
                                budget_data={this.state.categories}
                                selectedCategories={this.state.selectedCategories}
                                multipleSelect
                                handleLock={this._handleLockPress}
                                saveCategorySelection={() => {
                                }}
                                handleTextChange={this._handleTextChange}
                                total_amount={this.props.budget_total}
                                max_amount={this.state.max_amount}
                                max_percentage={this.state.max_percentage}
                                callNotificationMethod={this._callNotificationMethod}
                            />
                                <View style={{backgroundColor: colors.backgroundGray, height: 2, marginTop: 5}}/>
                                <TouchableOpacity style={[{backgroundColor: 'transparent', marginTop: 10}]}
                                                  onPress={this._addExpense}>
                                    <Text style={[fixStyles.fontContainer,
                                        styles.buttonStyle,
                                        {color: colors.backgroundBlue, fontWeight: 'bold'}]}
                                    >
                                        + ADD MORE EXPENSE
                                    </Text>
                                </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{marginVertical: 10}}>
                        <TouchableOpacity style={[styles.nextButton, styles.borderStyle, { backgroundColor: colors.backgroundBlue}]}
                                          onPress={this._handleUpdateBudget}>
                            {this._renderUpdateButtonContent()}
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardShift>);
        } else {
            return (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size="large"/></View>)
        }
    }
    render() {

        return (
            <View style={{flex: 1}}>
                <View style={{ flex: 1, position: 'absolute', zIndex: -1 }}>
                    <View style={{width: getWidthByPerc(100), height: getHeightByPerc(45), backgroundColor: colors.backgroundBlue}}/>
                    <View style={{width: getWidthByPerc(100), height: getHeightByPerc(55), backgroundColor: colors.backgroundGray}}/></View>
                {this._renderContent()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    borderStyle: {
        // borderWidth: 1,
        // borderColor: colors.black,
        borderRadius: 6,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {  height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        // overflow: 'hidden',
        // marginHorizontal: 5
    },
    mainContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
        width: getWidthByPerc(100),
        height: getHeightByPerc(100),
    },
    whiteColor: {
        color: colors.white,
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listText: {
        color: colors.black
    },
    paddingVertical: {
        paddingVertical: 5
    },
    nextButton: {
        paddingVertical:10,
        backgroundColor: colors.white,
        width: getWidthByPerc(100, 40),
    },
    buttonStyle: {
        textAlign: 'center',
        fontSize: 14,
        color: colors.black,
    },
    budgetInput: {
        minWidth: 80,
        borderBottomWidth: 1,
        borderBottomColor: colors.white,
        padding: 0,
        fontSize: 36,
        color: colors.white,
        marginLeft: 2,
        // textAlign: 'center',
        height:36,
        marginTop: 7
    }
});
function mapStateToProps(state) {

    console.log("")
    console.log("Editando budget")
    console.log("")
    console.log("total: "+ state.budget.total_amount)
    console.log("")
    console.log("categories: ")
    console.log("")
    console.log(state.budget.categories);


    return {
        budget_total: state.budget.total_amount,
        budget_categories: state.budget.categories
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionSetBudgetCategories: actionSetBudgetCategories,
        actionSetTotalAmount: actionSetTotalAmount
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
