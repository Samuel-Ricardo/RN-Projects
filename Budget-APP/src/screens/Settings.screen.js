/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 12/11/18.
 */
/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 02/11/18.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground, Image, ActivityIndicator, Switch } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Item, Input, Button, Textarea } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import fixStyles, { colors } from '../styles/index.style';
import { getHeightByPerc, getWidthByPerc } from '../styles/StyleUtils.style';
import { actionLogoutUser } from '../actions/Auth.action';

class SettingsScreen extends React.PureComponent {
    static navigatorStyle = {
        statusBarColor: 'transparent',
        statusBarTextColorScheme: 'light',
        navBarHidden: true,
        drawUnderStatusBar: true
    };

    constructor(props) {
        super(props);
        this.state = {
            isSwitchOn: false,
            bottomButtonText: 'Log Out',
            isWorking: false,
        };
        this._handleBackButton = this._handleBackButton.bind(this);
    }

    componentDidMount() {
    }
    _handleSwitchChange(status) {
        // serviceNotificationStatusUpdate({ status: status, device_id: DeviceInfo.getUniqueID() }).then((data) => {
        //     if (!data.error) {
        //         this.setState({ isSwitchOn : status });
        //     }
        // });
    }
    _renderSignUpButtonContent() {
        if(!this.state.isWorking) {
            return (<Text style={[ fixStyles.fontContainer, styles.authButtonText]}>{this.state.bottomButtonText}</Text>)
        } else {
            return (<ActivityIndicator />)
        }
    }
    _handleBackButton() {
        this.props.navigator.pop({
            animated: true,
            animationType: 'slide-horizontal',
        });
    }
    _handleLogout() {
        this.setState({ isWorking: true });
        this.props.actionLogoutUser();
        this.props.navigator.resetTo({
            screen: 'survey.Signup',
            navigatorStyle: {
                navBarHidden: true
            }
        });
    }
    render() {
        return (
            <View style={{ flex: 1}}>
                <ImageBackground
                    source={require('../resources/ic_background.jpg')}
                    style={{ width: getWidthByPerc(100), height: getHeightByPerc(100) }}
                >
                    <KeyboardAwareScrollView keyboardShoulePersistTaps enableOnAndroid>
                        <View style={[styles.flexRow, {justifyContent: 'flex-start', paddingHorizontal: 10, paddingTop: 40}]}>
                            <TouchableOpacity onPress={this._handleBackButton}>
                                <Image source={require('../resources/ic_back.png')}
                                       style={{width: 20, height: 15, marginRight: 10}}/>
                            </TouchableOpacity>
                            <Text style={[fixStyles.fontContainer, {fontSize: 12 , color: colors.white}]}>Settings</Text>
                        </View>
                        <View style={styles.questionContainer}>
                            <View style={styles.questionCard}>
                                <Image source={require('../resources/ic_logo.jpg')} style={{ width: 100, height: 100 }} />
                                <Text style={[ fixStyles.fontContainer, styles.questionText ]}>SIMPLE BUDGETZ APP</Text>
                            </View>
                            <View style={{flex:2}}>
                                <View style={styles.rowView}>
                                    <Text style={[fixStyles.fontContainer, styles.userText]}>Name</Text>
                                    <Text style={[ fixStyles.fontContainer, styles.userText, { fontWeight: 'bold' } ]}>{this.props.user_name}</Text>
                                </View>
                                <View style={styles.rowView}>
                                    <Text style={[fixStyles.fontContainer, styles.userText]}>Email</Text>
                                    <Text style={[ fixStyles.fontContainer, styles.userText, { fontWeight: 'bold' } ]}>{this.props.user_email}</Text>
                                </View>
                                {/*<View style={styles.rowView}>*/}
                                    {/*<Text style={[fixStyles.fontContainer, styles.userText]}>Notification</Text>*/}
                                    {/*<Switch*/}
                                        {/*onValueChange={this._handleSwitchChange.bind(this)}*/}
                                        {/*value={this.state.isSwitchOn}*/}
                                    {/*/>*/}
                                {/*</View>*/}
                                <View>
                                    <TouchableOpacity style={[styles.nextButton, { marginVertical: 20, }]} onPress={this._handleLogout.bind(this)}>
                                        {this._renderSignUpButtonContent()}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </KeyboardAwareScrollView>

                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    questionContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-around',
        width: getWidthByPerc(100),
        height: getHeightByPerc(100)
    },
    questionCard: {
        flex: 2,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 20,
        marginTop: 15,
        color: colors.white
    },
    userText: {
        fontSize: 18,
        color: colors.white
    },
    nextButton: {
        paddingVertical:10,
        backgroundColor: colors.white,
        width: getWidthByPerc(100, 40),
    },
    buttonStyle: {
        textAlign: 'center',
        fontSize: 18,
        color: colors.black,
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingBottom: 20
    },

    paddingBottom: {
        marginTop: 5,
        justifyContent: 'center'
    },
    rowView :{
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    authButtonText: {
        color: colors.gray,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

});
function mapStateToProps(state) {
    return {
        user_name: 'user_name' in state.auth.user_profile ? state.auth.user_profile.user_name: '',
        user_email: 'user_email' in state.auth.user_profile ? state.auth.user_profile.user_email: '',
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionLogoutUser: actionLogoutUser,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);