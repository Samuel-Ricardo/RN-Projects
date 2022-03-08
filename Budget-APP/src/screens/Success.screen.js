/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 27/09/18.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import fixStyles, { colors } from '../styles/index.style';
import { getHeightByPerc, getWidthByPerc } from '../styles/StyleUtils.style';




class Success extends React.PureComponent {
    static navigatorStyle = {
        statusBarColor: 'transparent',
        statusBarTextColorScheme: 'light',
        navBarHidden: true,
        drawUnderStatusBar: true
    };

    constructor(props) {
        super(props);
        this.state = {


        },
        this._handleNextButton = this._handleNextButton.bind(this);

    }

    componentDidMount() {
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
        this.props.navigator.push({
            screen: 'survey.Result',
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
            <View style={styles.questionContainer}>
                <View style={{ flex: 1.5, justifyContent: 'flex-end' }}>

                </View>
                <View style={styles.questionCard}>
                    <Text style={[fixStyles.fontContainer, styles.greatText]}>Great !</Text>
                    <View style={[fixStyles.textUnderLine, { marginVertical: 10 }]} />
                    <Text style={[ fixStyles.fontContainer, styles.questionText ]}>Your budget is ready!</Text>
                    <TouchableOpacity style={[styles.nextButton, { marginVertical: 20, }]} onPress={this._handleResultButton.bind(this)}>
                        <Text style={[fixStyles.fontContainer, styles.buttonStyle,  ]}>SHOW ME</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1.5  }}>
                    <Text style={[fixStyles.fontContainer, { marginBottom: 10, color: colors.white, fontSize: 12, textAlign: 'center' }]}>Feel Free to play around, Just press this button to reset</Text>
                    <TouchableOpacity style={[styles.nextButton, {  backgroundColor: 'transparent', borderColor: colors.white, borderWidth: 1 }]} onPress={this._handleNextButton}>
                        <Text style={[fixStyles.fontContainer, styles.buttonStyle, { color: colors.white } ]}>RETAKE THE TEST</Text>
                    </TouchableOpacity>
                </View>
            </View>

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
        fontSize: 24,
        fontWeight: 'bold',
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
    }
});

export default Success;