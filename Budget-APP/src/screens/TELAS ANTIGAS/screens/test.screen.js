import React, {Component} from 'react';
import { View, Text, StyleSheet, Alert, TextInput, ActivityIndicator, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Item, Input, Button, Textarea } from 'native-base';
import StylesObj, { colors } from '../styles/index.style';
import { getWidthByPerc } from "../styles/StyleUtils.style";


const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email'
    }
    if (!values.contact) {
        errors.contact = 'Required'
    } else if ((values.contact.length < 10 || values.contact.length > 10)) {
        errors.contact = 'Invalid Contact';
    }
    if (!values.message) {
        errors.message = 'Required';
    }
    return errors;
};


class ContactScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Contact',
            headerStyle: {
                backgroundColor: colors.headerColor,
            },
            headerTintColor: colors.white
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            bottomButtonText: 'SEND',
            isWorking: false,
        };
    }

    componentWillMount() {
    }
    componentDidMound() {
    }
    componentWillUnmount() {
    }


    handleSubmitWrapper() {
        const { handleSubmit, navigation } = this.props;
        // navigation.navigate('SIGNUP_SECOND');
        handleSubmit((data) => {
            this.setState({ isWorking: true });
            serviceContact(data).then((data) => {
                if (!data.error) {
                    navigation.navigate('HOME_SCREEN');
                    Alert.alert('Sent', 'Message Sent!', [
                            {
                                text: 'OK', onPress: () => {
                            }
                            },
                        ],
                        {cancelable: false});
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

    _renderSignUpButtonContent() {
        if(!this.state.isWorking) {
            return (<Text style={[ StylesObj.fontContainer, styles.authButtonText]}>{this.state.bottomButtonText}</Text>)
        } else {
            return (<ActivityIndicator />)
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.appbackground }}>
                <KeyboardAwareScrollView >
                    <View style={styles.mainContainer}>
                        <View >
                            <View style={styles.container}>
                                <View style={{ height: 90 }}/>
                                <View style={{ height: 90 }}/>
                                <View style={{ flexDirection: 'row'}}>
                                    <View style={{ borderBottomWidth:1, borderBottomColor: colors.ligthgrey, marginBottom:19 }}>
                                        <Text style={[ StylesObj.fontContainer, { color: colors.black, fontSize: 17 }, Platform.OS == 'ios' ? { paddingTop: 18 }: {paddingVertical: 13}]}>
                                            +91 -
                                        </Text>
                                        <TextInput style={{ width:200, backgroundColor: 'red' }}/>
                                    </View>
                                    <View style={{flex: 1}}>
                                       <View style={{ height: 90 }}/>
                                    </View>
                                </View>
                                <View style={{ height: 90 }}/>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <View>
                    <Button disabled={this.state.isWorking} block primary onPress={this.handleSubmitWrapper.bind(this)} style={styles.authButton}>
                        {this._renderSignUpButtonContent()}
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.appbackground,
        paddingHorizontal: 5
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingBottom: 20
    },
    authButton: {
        backgroundColor: colors.charcol
    },
    authButtonText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
    },
    paddingBottom: {
        marginTop: 5,
        justifyContent: 'center'
    }
});


export default (ContactScreen);