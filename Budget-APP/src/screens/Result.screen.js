/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 27/09/18.
 */
import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground, Image, InteractionManager, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fixStyles, { colors } from '../styles/index.style';
import { getHeightByPerc, getWidthByPerc } from '../styles/StyleUtils.style';
import { actionGetBudgetFromServer } from '../actions/Budget.action';
import { actionLogoutUser } from '../actions/Auth.action';
import { AsyncStorage } from 'react-native'


class Result extends React.PureComponent {
    static navigatorStyle = {
        statusBarColor: 'transparent',
        statusBarTextColorScheme: 'light',
        navBarHidden: true,
        drawUnderStatusBar: true
    };

    constructor(props) {
        super(props);
        this.state = {
            interactionsComplete: false,
        };
        this._handleNextButton = this._handleNextButton.bind(this);
        this._handleSettingButton = this._handleSettingButton.bind(this);
        this._gotoQuestion = this._gotoQuestion.bind(this);
        this._handleBackButton = this._handleBackButton.bind(this);
        this.tempTitles = {
            charity: 'Charity',
            saving: 'Savings',
            rent: 'Rent/Utilities',
            gas: 'Gas/Car',
            food: 'Food Supplies',
            spendable: 'Spendable',
            travel: 'Travel',
        }
        //this.total_amount = 1000, 
        //this.categories = [
        //        {id: 1, is_locked: false, title: "tax", percentage: "10.00", amount: "100"},
        //        {id: 2, is_locked: false, title: "loan", percentage: "10.00", amount: "100"},
        //        {id: 3, is_locked: false, title: "creditcard", percentage: "10.00", amount: "100"},
        //        {id: 4, is_locked: false, title: "healthcare", percentage: "10.00", amount: "100"},
        //       {id: 5, is_locked: false, title: "insurance", percentage: "10.00", amount: "100"},
        //         {id: 6, is_locked: false, title: "spendable", percentage: "50.00", amount: 500}
        //    ]
            
            

        AsyncStorage.getItem('budget').then((budget) => {
            
                this.budget_error = false
                this.is_fetching = budget.is_fetching
                this.budget_total = budget.total_amount
                this.budget_categories = budget.categories
             
         })
    }


    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ interactionsComplete: true });
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
    _gotoQuestion() {
        this.props.navigator.resetTo({
            screen: 'survey.Home',
            navigatorStyle: {
                navBarHidden: true
            }
        });
    }
    _handleSettingButton() {
        this.props.navigator.push({
            screen: 'survey.Setting',
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
    _renderCategories() {
        return 
        
        this.props.budget_categories.map((val, key) => {
        
            //this.budget_categories.map((val, key) => {

            return(  <View key={val.title} style={ [styles.flexRow, styles.resultList, styles.paddingVertical, this.props.budget_categories.length != key +1 ? { borderBottomWidth: 2, borderBottomColor: colors.backgroundGray, paddingBottom: 8} : {}] }>
                <View style={{flexDirection: 'row'}}>
                <Text style={[fixStyles.fontContainer, styles.listText, { textAlign: 'center', color: colors.backgroundBlue, minWidth: 40 }]}>{val.percentage}%</Text>
                <Text style={[fixStyles.fontContainer, styles.listText, { }]}>{val.title in this.tempTitles ? this.tempTitles[val.title] : val.title}</Text>
                </View>
                <Text style={[fixStyles.fontContainer, styles.listText]}>$ {val.amount} </Text>
            </View>);
        })
    }
    _renderList() {

        if(this.props.is_fetching && this.state.interactionsComplete) {

            //if(this.is_fetching && this.state.interactionsComplete) {


            return (
            
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large"/>
            </View>
            )

        } else if(this.props.budget_error) {
         //   else if(this.budget_error) {
            
            return (
            
                <View style={[ {flex: 1, justifyContent: 'center', alignItems: 'center'}]}>

                    <TouchableOpacity style={[
                        styles.nextButton,
                        {  backgroundColor: 'transparent',
                            borderColor: colors.white,
                            borderWidth: 1,
                            marginTop: 10
                        }]} onPress={() => { this.props.actionGetBudgetFromServer();}}
                    >

                        <Text style={[fixStyles.fontContainer, styles.buttonStyle, { color: colors.white }]}>
                            RETRY
                        </Text>

                    </TouchableOpacity>
                </View>
            )

        } else if(parseInt(this.props.budget_total) > 0 && this.props.budget_categories.length > 0) {

            return ( 
            
            <ScrollView>
                <View style={styles.mainContainer}>
                    <View style={styles.flexRow}>
                        <Text style={[fixStyles.fontContainer, styles.whiteColor, { fontSize: 12 }]}>Hey {this.props.user_name}</Text>
                        <TouchableOpacity onPress={this._handleSettingButton}>
                            <Image source={require('../resources/setting.png')} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.flexRow, { marginTop: 30 }]}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <View style={{flex: 1 }}>
                                <Text style={[fixStyles.fontContainer, styles.whiteColor, { fontSize: 38, fontWeight: 'bold' }]}>
                                    ${this.props.budget_total}
                                </Text>
                            </View>
                            <View style={{flex: 1 }}>
                                <Text style={[fixStyles.fontContainer, styles.whiteColor, { fontSize: 14 }]}>
                                    In total
                                </Text>
                            </View>
                            {/*<View style={[fixStyles.textUnderLine, { marginTop: 5 }]}/>*/}
                        </View>

                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={[fixStyles.fontContainer, { textAlign: 'right', fontSize: 10, color: colors.white }]}>Calculated Automatically</Text>
                        <View style={[styles.borderStyle,{ backgroundColor: colors.white, paddingVertical: 15, paddingHorizontal: 10 }]}>
                            <View style={{flex: 1, alignItems: 'flex-end', paddingBottom: 5, paddingRight: 5}}>
                            <TouchableOpacity onPress={() => {
                                this.props.navigator.push({
                                    screen: 'survey.Edit',
                                    navigatorStyle: {
                                        navBarHidden: true
                                    }
                                });
                            }}>
                                <Text style={[ fixStyles.fontContainer, { color: colors.backgroundBlue, fontWeight: 'bold',  } ]}>Edit</Text>
                            </TouchableOpacity>
                            </View>
                            {this._renderCategories()}
                        </View>
                    </View>

                    <View style={[ styles.borderStyle, { paddingHorizontal: 10, paddingVertical: 5, marginTop: 10, backgroundColor: colors.white }]}>
                        <Text style={[fixStyles.fontContainer, { color: colors.backgroundBlue, fontSize: 16, marginBottom: 5, fontWeight: 'bold'} ]}>TIP</Text>
                        <View style={{
                            borderStyle: 'dashed',
                            borderTopWidth: 2,
                            borderColor: colors.backgroundGray,
                            paddingVertical: 5,

                        }}>
                            <Text style={[fixStyles.fontContainer, { color: colors.black, fontSize: 12, fontWeight: 'bold' }]}>
                                Try to save as much as possible! {"\n"}
                                10% is healthy but try to get it way higher!
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity style={[
                            styles.borderStyle,
                            styles.nextButton,
                            {  backgroundColor: colors.white,
                                marginTop: 10,
                            }]} onPress={() => {
                            // this._handleNextButton()
                        }}>
                            <Text style={[fixStyles.fontContainer, styles.buttonStyle, { color: colors.black }]}>
                                LIKED THE RESULTS? GET OVER E-MAIL
                            </Text>
                        </TouchableOpacity>
                        <Text style={[fixStyles.fontContainer, { textAlign: 'center', fontWeight: 'bold', color: colors.black, marginVertical: 10 }]}>
                            OR
                        </Text>
                        <TouchableOpacity style={[ styles.borderStyle, styles.nextButton, { backgroundColor: colors.backgroundBlue }]} onPress={this._handleNextButton}>
                            <Text style={[fixStyles.fontContainer, styles.buttonStyle, { fontWeight: 'bold', color: colors.white}  ]}>RETAKE THE TEST</Text>
                        </TouchableOpacity>
                        <View style={{ height: 20}}/>
                    </View>
                </View>
            </ScrollView>);
        } else {
            this._gotoQuestion();
            return null;
        }
    }
    render() {

        return (

            <View style={{ flex: 1}}>
                <View style={{ flex: 1, position: 'absolute', zIndex: -1 }}>
                    <View style={{width: getWidthByPerc(100), height: getHeightByPerc(45), backgroundColor: colors.backgroundBlue}}/>

                    <View style={{width: getWidthByPerc(100), height: getHeightByPerc(55), backgroundColor: colors.backgroundGray}}/></View>

                {this._renderList()}
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
        // flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
        width: getWidthByPerc(100),
        // height: getHeightByPerc(100),
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
        color: colors.black,
        fontWeight: 'bold'
    },
    paddingVertical: {
        paddingVertical: 5
    },
    nextButton: {
        paddingVertical:12,
        backgroundColor: colors.white,
        width: getWidthByPerc(100, 40),
    },
    buttonStyle: {
        textAlign: 'center',
        fontSize: 14,
        color: colors.black,
    },
    resultList: {
        marginBottom: 2,
    }

});

function mapStateToProps(state) {
    return {
        budget_error: false,
        is_fetching: state.budget.is_fetching,
        budget_total: state.budget.total_amount,
        budget_categories: state.budget.categories,
       user_name: 'user_name' in state.auth.user_profile ? state.auth.user_profile.user_name: ''
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionGetBudgetFromServer: actionGetBudgetFromServer,
        actionLogoutUser: actionLogoutUser,
    }, dispatch);
}

//mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(Result);