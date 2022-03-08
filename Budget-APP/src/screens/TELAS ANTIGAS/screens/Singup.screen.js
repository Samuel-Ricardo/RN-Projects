/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 02/11/18.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, ImageBackground, Image, ActivityIndicator, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { connect,  } from 'react-redux';
import { bindActionCreators } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Item, Input, Button, Textarea } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { Field, reduxForm } from 'redux-form';
import fixStyles, { colors } from '../styles/index.style';
import { getHeightByPerc, getWidthByPerc } from '../styles/StyleUtils.style';
import { serviceSignup } from '../services/Auth.service';
import { actionLoginUser } from '../actions/Auth.action';
import { actionGetBudgetFromServer } from '../actions/Budget.action';
import KeyboardManager from 'react-native-keyboard-manager';

const validate = values => {
    console.log('Singup up values', values);
    const errors = {};
    if (!values.name) {
        errors.name = 'Required'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email'
    }
    if (!values.password) {
        errors.password = 'Required'
    }
    return errors;
};


class SignupScreen extends React.PureComponent {
    static navigatorStyle = {
        statusBarColor: 'transparent',
        statusBarTextColorScheme: 'light',
        navBarHidden: true,
        drawUnderStatusBar: true
    };

    constructor(props) {
        super(props);
        this.state = {
            bottomButtonText: 'SIGN UP',
            isWorking: false,
            hidePassword: true
        };
        this._handleNextButton = this._handleNextButton.bind(this);
        this._handleSubmitWrapper = this._handleSubmitWrapper.bind(this);
        this._handleLoginClick = this._handleLoginClick.bind(this);
        this.managePasswordVisibility = this.managePasswordVisibility.bind(this);
    }

    componentDidMount() {
        if(Platform.OS == 'ios') {
            KeyboardManager.setEnable(false);
            KeyboardManager.setEnableAutoToolbar(false);
        }

        // this.props.checkToken(JSON.stringify({token: 12, user_id: 21}));
        // this.props.navigator.push({
        //     screen: 'survey.Result',
        //     navigatorStyle: {
        //         navBarHidden: true
        //     }
        // });
    }

    renderField({label, onEnter, maxLength, keyboardType, meta: {touched, error, warning}, input: {onChange, ...restInput}, secureTextEntry, autoCapitalize, multiline, numberOfLines }) {
        let hasError = false;
        if (error !== undefined) {
            hasError = true;
        }
        return (<View style={{flexDirection: 'column', height: 70, alignItems: 'flex-start'}}>

            <Item>
                <Input
                    style={{ color: colors.white }}
                    onSubmitEditing={onEnter}
                    autoCapitalize={autoCapitalize ? autoCapitalize : 'sentences'}
                    placeholderTextColor={colors.white}
                    secureTextEntry={secureTextEntry ? secureTextEntry : false}
                    keyboardType={keyboardType}
                    placeholder={label}
                    onChangeText={onChange}
                    maxLength={maxLength ? maxLength : null}
                    multiline={ multiline ? multiline : false }
                    numberOfLines={ numberOfLines ? numberOfLines : 1 }
                    {...restInput}
                />
                {touched && ((error && <Icon name={'ios-alert'} style={{ color: 'red', fontSize: 18 }} />) ||
                (warning && <Text style={[ fixStyles.fontContainer, {color: 'orange'}]}>{warning}</Text>))}
            </Item>
        </View>);
    }
    _handleSubmitWrapper() {
        const { handleSubmit, navigation } = this.props;
        // navigation.navigate('SIGNUP_SECOND');
        handleSubmit((data) => {
            this.setState({ isWorking: true });
            serviceSignup(data).then((data) => {

                console.log(data)

                if (!data.error) {

                    this.props.actionLoginUser(data.data);
                    this.props.actionGetBudgetFromServer(data.data);

                    this.props.navigator.resetTo({
                        screen: 'survey.Home',
                        navigatorStyle: {
                            navBarHidden: true
                        }
                    });
                } else {
                    Alert.alert('Oops', data.message, [
                            {
                                text: 'OK', onPress: () => {
                            }
                            },
                        ],
                        {cancelable: false});
                }
                this.setState({ isWorking: false });
            });
        })();

    }
    _handleLoginClick() {
        this.props.navigator.push({
            screen: 'survey.Login',
            navigatorStyle: {
                navBarHidden: true
            }
        });
    }
    _renderSignUpButtonContent() {
        if(!this.state.isWorking) {
            return (<Text style={[ fixStyles.fontContainer, styles.authButtonText]}>{this.state.bottomButtonText}</Text>)
        } else {
            return (<ActivityIndicator />)
        }
    }
    _handleNextButton() {
        this.props.navigator.resetTo({
            screen: 'survey.Home',
            animated: true,
            navigatorStyle: {
                navBarHidden: true
            }
        });
    }

    _handleResultButton() {
        this.props.navigator.resetTo({
            screen: 'survey.Result',
            navigatorStyle: {
                navBarHidden: true
            }
        });
    }

    managePasswordVisibility = () =>
    {
        this.setState({ hidePassword: !this.state.hidePassword });
    }
    render() {
        return (
            <View style={{ flex: 1}}>
                <ImageBackground
                    source={require('../resources/ic_background.jpg')}
                    style={{ width: getWidthByPerc(100), height: getHeightByPerc(100) }}
                >
                    <KeyboardAwareScrollView keyboardShoulePersistTaps="always" enableOnAndroid>
                    <View style={styles.questionContainer}>
                        <View style={styles.questionCard}>
                            <Image source={require('../resources/ic_logo.jpg')} style={{ width: 100, height: 100 }} />
                            <Text style={[ fixStyles.fontContainer, styles.questionText ]}>SIMPLE BUDGETZ APP</Text>
                            <View style={{ marginTop: 10 }}>
                                <Field blurOnSubmit={false}  name="name" keyboardType="default" label="Full Name" component={this.renderField} />
                                <Field
                                    autoCapitalize="none"
                                    name="email"
                                    keyboardType="email-address"
                                    label="Email Address"
                                    component={this.renderField}
                                />
                                <View style={{ position: 'relative', alignSelf: 'stretch', justifyContent: 'center'}}>
                                    <Field
                                        blurOnSubmit={false}
                                        secureTextEntry={this.state.hidePassword}
                                        name="password"
                                        keyboardType="default"
                                        label="Password"
                                        component={this.renderField}
                                    />
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={{ position: 'absolute', right: 3, height: 40, width: 35, padding: 5 }}
                                        onPress={this.managePasswordVisibility}
                                    >
                                        <Icon style={{color: colors.white, fontSize: 20 }} name={( this.state.hidePassword ) ? "md-eye-off" : "md-eye"}  />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={[styles.nextButton, { marginVertical: 10, }]} onPress={this._handleSubmitWrapper.bind(this)}>
                                    {this._renderSignUpButtonContent()}
                                </TouchableOpacity>
                                <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 5}}>
                                <Text style={[fixStyles.fontContainer, { color: colors.white }]}>Already Have An Account?</Text>
                                    <TouchableOpacity onPress={this._handleLoginClick.bind(this)}>
                                    <Text  style={[fixStyles.fontContainer, { color: colors.white, textDecorationLine: 'underline', marginLeft: 5 }]}>Log In</Text>
                                </TouchableOpacity>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                    <Text style={[fixStyles.fontContainer, { color: colors.white }]}>I agree to all the</Text>
                                    <TouchableOpacity onPress={this._handleLoginClick.bind(this)}>
                                        <Text  style={[fixStyles.fontContainer, { color: colors.white, textDecorationLine: 'underline', marginLeft: 5 }]}>Terms and Conditions</Text>
                                    </TouchableOpacity>
                                </View>
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
        flex: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 20,
        marginTop: 15,
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
    numberStyle: {
        fontSize: 20,
        color: colors.white
    },
    greatText: {
        fontSize: 50,
        color: colors.white,
        fontWeight: 'bold'
    },
    mainContainer: {
        backgroundColor: colors.white,
        paddingHorizontal: 5
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingBottom: 20
    },
    authButton: {
        backgroundColor: colors.headerColor
    },
    authButtonText: {
        color: colors.gray,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    paddingBottom: {
        marginTop: 5,
        justifyContent: 'center'
    }
});

const ReduxForm = reduxForm({
    form: 'signup_form',
    validate,
})(SignupScreen);

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionLoginUser: actionLoginUser,
            actionGetBudgetFromServer: actionGetBudgetFromServer
         }, dispatch);
}

export default connect(null, mapDispatchToProps)(ReduxForm);