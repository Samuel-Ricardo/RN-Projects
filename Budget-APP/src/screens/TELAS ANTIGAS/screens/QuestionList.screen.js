/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 18/09/18.
 */

import React, { Component } from  'react';

import { 
    View, 
    ImageBackground, 
    Text, 
    StyleSheet, 
    Platform, 
    TouchableOpacity, 
    Dimensions, 
    FlatList, 
    Keyboard, 
    InteractionManager, 
    ActivityIndicator
 } from 'react-native';

import _ from 'lodash';
import Snackbar from 'react-native-snackbar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fixStyles, { colors } from '../styles/index.style';
import { getWidthByPerc, getHeightByPerc } from '../styles/StyleUtils.style';
import QuestionItem from '../components/Questions/Item.component';
import Data from '../config/data.json';
import { serviceGetQuestions, serviceUpdateBudget } from '../services/Home.service';
import { actionSetBudgetCategories, actionSetTotalAmount } from '../actions/Budget.action';
import KeyboardManager from 'react-native-keyboard-manager';

const itemVisibleHotfix = {
    minimumViewTime: 3000,
    viewAreaCoveragePercentThreshold: 100,
    waitForInteraction: true,
    itemVisiblePercentThresold: 100,
}
class QuestionList extends Component {
    static navigatorStyle = {
        statusBarColor: 'transparent',
        statusBarTextColorScheme: 'light',
        navBarHidden: true,
        drawUnderStatusBar: true
    };

    constructor(props) {
        super(props);
        this.flatList = null;
        this.focusArea = [];
        this.state= {
            width: null,
            height: null,
            data: [],
            ids_arr: [],
            currentPage: 0,
            current_ques_no: 1,
            category_data: [],
            total_amount: null,
            interactionsComplete: false,
            is_fetching: true,
            is_error: false,
        };
        this._onLayout = this._onLayout.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this._keyExtractor = this._keyExtractor.bind(this);
        this._onSwipeChange = this._onSwipeChange.bind(this);
        this._handleNextPress = this._handleNextPress.bind(this);
        this._callNotification = this._callNotification.bind(this);
        this._callNotificationMethod = _.debounce(this._callNotification, 500);
        this._getQuestions = this._getQuestions.bind(this);
        this.temp_taxes = {'charity': 10, 'saving': 10, 'rent': 35, 'gas': 15, food: 10,
            travel: 10, spendable: 10}
    }
    componentDidMount() {
        if(Platform.OS == 'ios') {
            KeyboardManager.setEnable(false);
            KeyboardManager.setEnableAutoToolbar(false);
        }
        InteractionManager.runAfterInteractions(() => {
           this.setState({ interactionsComplete: true });
        });
        const tempCategories = [
            {amount: "0",
                //id: 1541075715403,
                is_locked: false,
                percentage: 0,
                title: "charity",
            },
            {
                amount: "0",
                //id: 1541075715403,
                is_locked: false,
                percentage: 0,
                title: "saving",
            },
            {
                amount: "0",
                //id: 1541075715403,
                is_locked: false,
                percentage: 0,
                title: "rent",
            },
            {
                amount: "0",
                //id: 1541075715403,
                is_locked: false,
                percentage: 0,
                title: "gas",
            },
            {
                amount: "0",
                id: 1541075715403,
                is_locked: false,
                percentage: 0,
                title: "food",
            },
            {
                amount: "0",
                //id: 1541075715403,
                is_locked: false,
                percentage: 0,
                title: "travel",
            },
            {
                amount: "500",
                //id: 1541075715403,
                is_locked: true,
                percentage: 100,
                title: "spendable",
            }
        ];
        //TESTE

         //this.props.actionSetTotalAmount(500);
        
         //this.props.actionSetBudgetCategories(tempCategories);
         this.props.navigator.resetTo({
             screen: 'survey.Success',
             navigatorStyle: {
                 navBarHidden: true
             }
         });
         
        this._getQuestions();
    }

    _getQuestions() {

        this.setState(
            { is_fetching: true, 
              is_error: false
             });

        serviceGetQuestions({}).then((data) => {

            if(!data.error) {

                console.log('----------SAMUKAEL---------')
                console.log('data: ',data);
                console.log('---------------------------')

                console.log('getQuestions reached')

                const tempData = data.data;
                const temp = [];
                const tempIds = [];

                Object.keys(tempData).forEach((val) => {

                    tempIds.push(parseInt(val));

                    temp.push(tempData[val]);

                });

                this.setState(
                    {
                        data: temp,
                        ids_arr: tempIds,
                        is_fetching: false,
                        is_error: false
                    });

            } else {
                this.setState({ is_fetching: false, is_error: true });

            }
        })
    }
    _callNotification() {

        this.props.navigator.showInAppNotification({
            screen: 'survey.Notification',
            passProps: { text: 'Please enter amount less than total amount' },
            autoDismissTimerSec: 1,
        })
    }

    _handleRadioPress(data) {
        console.log(data);
    }
    _onLayout() {
        const { width, height } = Dimensions.get('window');
        this.setState({ width, height });
    }
    _onSwipeChange = ({ viewableItems }) => {
        console.log(viewableItems);
        if (!viewableItems[0] || this.state.currentPage === viewableItems[0].index)
            return;

        this.setState(state => {
            return {
                previousPage: state.currentPage,
                currentPage: viewableItems[0].index,
                // backgroundColorAnim: new Animated.Value(0),
            };
        });
    };
    _handleNextPress(question_id, answer, next=null) {

        // // console.log('REFS', this.refs, this.textRef);
        // console.log('focusArea', this.focusArea);
        console.log("question:",question_id,"next:", next ,"answer:",answer);

        if(answer) {

            let nextId = 0;

            if(next) {
                nextId = this.state.ids_arr.indexOf(next);
            }

            const nextPage = (next) ? nextId : this.state.currentPage + 1;

            const questionIndex = this.state.ids_arr.indexOf(question_id);
            const tempQuestion = this.state.data[questionIndex];
            let totalAmount = this.state.total_amount;

            console.log('question', tempQuestion);

            // set the total amount value here
            if(tempQuestion.category.toLowerCase() == 'amount' && tempQuestion.type == 'TEXT') {

                console.log('set the total amount', answer);
                totalAmount = parseInt(answer);
                this.setState({ total_amount: totalAmount });

            } else if(tempQuestion.category.toLowerCase() == 'tax' && tempQuestion.type == 'SELECT') {

                const temp = parseInt(answer);
                const tempTax = (((totalAmount * temp) / 100 )).toFixed(2);
                
                console.log(totalAmount, tempTax, 'TAX');
                
                totalAmount -= tempTax;

                this.setState({ total_amount: totalAmount });

            } else if(tempQuestion.category.toLowerCase() != 'amount' && tempQuestion.type == 'TEXT') {

                console.log('minus the total amount', answer);

                totalAmount = this.state.total_amount - parseInt(answer);
                this.setState({ total_amount: totalAmount });
            }

            const temp = this.state.category_data;

            temp[(tempQuestion.category).toLowerCase()] = tempQuestion.type != 'RADIO' ? answer : 0;
            
            this.setState({ category_data: temp  });

            if (nextPage < this.state.data.length && next !=0) {

                Keyboard.dismiss();
                this.flatList.scrollToIndex({
                    animated: true,
                    index: nextPage
                });

                this.setState(
                    {
                        currentPage: nextPage, 
                        current_ques_no: this.state.current_ques_no + 1
                     });

                if(this.focusArea[nextPage]) {
                    (this.focusArea[nextPage]).focus();
                }

            } else {

                console.log(this.state.category_data);

                const tempTotal = parseInt(this.state.category_data['amount']);
                let tempReturnTotal = tempTotal;

                // this.props.actionSetTotalAmount(tempTotal);
                const tempCategories = [];

                Object.keys(this.state.category_data).forEach((val) => {

                    if(val != 'amount') {

                        const temp = this.state.category_data[val];

                        if(val != 'tax') {

                            tempReturnTotal -= temp;
                            
                        } else {
                            // const tempTax = (((tempTotal * temp) / 100 )).toFixed(2);
                            // tempReturnTotal -= tempTax;
                        }
                        const tempPercetage = ((temp * 100 / tempTotal)).toFixed(2);
                        // tempCategories.push({
                        //     id: Date.now(),
                        //     title: val,
                        //     percentage: tempPercetage,
                        //     amount: temp,
                        //     is_locked: false,
                        // })
                    }
                });
                if(this.state.total_amount > 0) {
                    const tempPercetage = ((totalAmount * 100 / tempTotal)).toFixed(2);
                    // tempCategories.push({
                    //     id: Date.now(),
                    //     title: 'spendable',
                    //     percentage: tempPercetage,
                    //     amount: totalAmount,
                    //     is_locked: false,
                    // })
                }
                Object.keys(this.temp_taxes).forEach((val) => {
                    const tempPercetage = (parseInt(this.temp_taxes[val]));
                    const tempAmount = (((tempReturnTotal * tempPercetage) / 100 )).toFixed(2);
                    tempCategories.push({
                        id: Date.now(),
                        title: val,
                        percentage: tempPercetage,
                        amount: tempAmount,
                        is_locked: false,
                    })
                });
                console.log(tempCategories, tempReturnTotal);

                this.props.actionSetTotalAmount(tempReturnTotal);

                this.props.actionSetBudgetCategories(tempCategories);

                serviceUpdateBudget({budget: tempCategories, total_amount: tempReturnTotal });

                this.props.navigator.resetTo({
                    screen: 'survey.Result',
                    navigatorStyle: {
                        navBarHidden: true
                    }
                });
            }
        } else {
            Snackbar.show({
                title: 'Please Answer Before Next Question',
                duration: Snackbar.LENGTH_SHORT
            })
        }
    }
    _keyExtractor(item, index) {
        return item.id.toString();
    }
    _renderItem({item, index}) {
        this.focusArea[index] = null;
        
        console.log('----------SAMUKAEL---------')
        console.log(index + ' indiano incomoda mt gente ');//KKKKKKKK
        console.log('---------------------------')
        console.log(item)
        console.log('---------------------------')

        return (<QuestionItem
                inputRef={(r) => {
                    
                     if(r) {
                         
                     this.textRef = { ...this.textRef, [`REF-FLATLIST${index}`] : r }

                    if(this.focusArea[index] == null) {
                        this.focusArea[index] = r;
                    }
                } }}
            index={index}
            current_ques_no={this.state.current_ques_no}
            data={item}
            nextPress={this._handleNextPress}
            total_amount={this.state.total_amount}
            call_notification={this._callNotificationMethod}
        />);
    }
    _renderContent() {
        console.log(this.state.is_fetching, this.state.interactionsComplete, this.state.is_error);

        if(this.state.is_fetching && this.state.interactionsComplete) {

            return (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                         <ActivityIndicator size="large"/>

                    </View>
                )

        } else if(this.state.is_error) {

                console.log('----------SAMUKAEL---------')
                console.log('Errinho ');
                console.log('---------------------------')

            return (
                
                

                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity style={[
                            styles.nextButton,
                            {  backgroundColor: 'transparent',
                                borderColor: colors.white,
                                borderWidth: 1,
                                marginTop: 10
                            }]} onPress={() => { this._getQuestions() }}
                        >

                            <Text style={[fixStyles.fontContainer, styles.buttonStyle, { color: colors.white }]}>

                                RETRY
                           
                            </Text>

                        </TouchableOpacity>
                    </View>
                )
        } else {

            console.log('----------SAMUKAEL---------')
            console.log('criando flat ');
            console.log('---------------------------')

            return( 
                
               

                <View style={{ flex: 1 }} onLayout={this._onLayout}>

                    <FlatList
                        keyboardShouldPersistTaps="always"
                        ref={list => {
                            this.flatList = list;
                        }}
                        scrollEnabled={false}
                        data={this.state.data}
                        pagingEnabled
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        onViewableItemsChanged={this._onSwipeChange}
                        viewabilityConfig={itemVisibleHotfix}
                        initialNumToRender={1}
                        extraData={
                            this.state // ensure that the list re-renders on orientation change
                        }
                    />

                </View>);

        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../resources/ic_background.jpg')}
                    style={{ width: getWidthByPerc(100), height: getHeightByPerc(100) }}
                >
                    {this._renderContent()}
                </ImageBackground>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    questionContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-around'
    },
    questionCard: {
        flex: 4,//era 4
        marginTop: 10
    },
    questionText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.white//white
    },
    nextButton: {
        paddingVertical:10,
        backgroundColor: colors.white,//white
        width: getWidthByPerc(100, 40),
    },
    buttonStyle: {
        textAlign: 'center',
        fontSize: 20,
        color: colors.white//white
    },
    numberStyle: {
        fontSize: 20,
        color: colors.white//white
    },

});
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionSetBudgetCategories: actionSetBudgetCategories,
        actionSetTotalAmount: actionSetTotalAmount
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        budget_total: state.budget.total,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);