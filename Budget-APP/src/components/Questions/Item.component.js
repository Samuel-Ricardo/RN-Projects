/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 20/09/18.
 */

//import React {useState}from 'react';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import Snackbar from 'react-native-snackbar';
import RadioGroup from '../RadioGroup.component';
import fixStyles, { colors } from '../../styles/index.style';
import { getHeightByPerc, getWidthByPerc } from '../../styles/StyleUtils.style';
import AutoCompletion from './AutoComplete.component';
import { numberWithCommas } from '../../util/Common.util';

const numReg = new RegExp(/^\d+$/);

class QuestionItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            answer: '',
            next: null,
            marginHeight: 0,
            typed: '',

        },
            this._handleRadioPress = this._handleRadioPress.bind(this);
        this._handleTextChange = this._handleTextChange.bind(this);
        this._handleNextButton = this._handleNextButton.bind(this);
        this._keyboardDidShow = this._keyboardDidShow.bind(this);
        this._keyboardDidHide = this._keyboardDidHide.bind(this);
        this.scrollView = null;

    }

    

    componentDidMount() {
        if(this.props.data.type == 'RADIO') {

            if(this.props.data.category.toLowerCase() != 'amount') {

                this.setState({
                    answer: this.props.data.data.length > 0 ? (this.props.data.data[0]).value : 0,
                    next: this.props.data.data.length > 0 ? parseInt(((this.props.data.data[0]).next)) : 0,
                })

            } else {

                this.setState({
                    next: this.props.data.data.length > 0 ? parseInt(((this.props.data.data[0]).next)) : 0,
                })
            }

        } else {
            this.setState({
                next: 'next' in this.props.data ? parseInt(this.props.data.next) : null,
            })
        }

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardDidHide);

    }
    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    _keyboardDidShow () {
        // alert('called');
        // if(this.scrollView) {
        //     alert('called');
        //     this.scrollView.getNode().scrollTo({ x: 0, y: 0, animated: true});
        // }
        // alert('Keyboard Shown');
        this.setState({ marginHeight: 50 });
    }

    _keyboardDidHide () {
        this.setState({ marginHeight: 0 });
        // alert('Keyboard Hidden');
    }
    _handleRadioPress(data) {
        this.setState({ answer: data.value, next: parseInt(data.next) });
    }

    _handleTextChange(tempText) {

        console.log("SAI DAQUI NGM TE CHAMOU ;-;")//KKKKKKKKKKK

        const text = tempText.replace(/,/g, '');
        //const text = tempText.replace(/);

        if(numReg.test(text) || text == "") {
            // console.log(this.props.total_amount, text);
            if (this.props.total_amount != null) {

                if (text == "") {
                    this.setState({answer: text});
                }
                
                else if ((this.props.total_amount - parseInt(text)) >= 0) {
                    this.setState({answer: text});
                } 
                
                else {

                    console.log("NOTIFIACDO")

                    this.props.call_notification();
                    // Snackbar.show({
                    //     title: 'Please enter amount less than total amount',
                    //     duration: Snackbar.LENGTH_SHORT
                    // })
                }

            } else {
                this.setState({answer: text});
            }
        }
    }

    //BATATA FRITA
    _handleNextButton(data) {

        if(this.props.data.type === 'TEXT'){

            console.log("SALVANDO TEXTOTERONA")

            this.setState({answer: text});
            //this._handleTextChange(this.state.typed)
        }

        this.props.nextPress(data.id, this.state.answer, this.state.next);
    }
    _renderInput(data) {

        console.log("Relou Uorde")

        if(data.type == 'RADIO') {

            console.log("CRIANDO RADIO")

            return (
                <RadioGroup radioButtons={data.data} category={data.category} onPress={this._handleRadioPress} />
            );

        } else if(data.type == 'TEXT') {

            console.log("CRIANDO TEXTOTERONA")

            return (

                <>
                    <TextInput
                        ref={(r) => { this.props.inputRef && this.props.inputRef(r) }}
                        
                        value={answer}
                        //value={this.state.answer}
                        style={styles.inputStyle}
                        placeholder={'Enter Data Here'}
                        placeholderTextColor={colors.placeholderTextColor}
                        onChangeText={text => this.setTate(text)}
                        //onChangeText={(text) => this.setState({answer: text})}
                        keyboardType={'numeric'}
                    />

                        {console.log('')}
                        {console.log('  CRIANDO TEXTOTERONA 2 ')}
                        {console.log('')}
                </>
            );

        } else if(data.type == 'SELECT') {

            console.log("CRIANDO TEXTOTERONA SELETIVA")

            return (
                <AutoCompletion
                    inputRef={(r) => { this.props.inputRef && this.props.inputRef(r) }}
                    onSelection={(text) => console.log("Selecionou "+ text)}
                    onChangeText={(text) => console.log("Selecionou "+ text)}
                />
            );
        }
        return null;
    }

    render() {

        console.log('')
        console.log('Criadno o questionItem ')
        console.log('')


        return (
            <View behavior="padding" >
                <View style={{ flex: 1}}>

                    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" >

                        <View style={{flex:1}} keyboardShouldPersistTaps={'always'}>
                            <View style={styles.questionContainer}>

                                <View style={{ flex: 0.5 }}/>
                                <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10, justifyContent: 'center', }}>

                                    <View style={{ flex: 1.5, justifyContent: 'flex-end' }}>

                                        <Text style={[fixStyles.fontContainer, styles.numberStyle ]}>
                                            {this.props.current_ques_no}

                                            {console.log('')}
                                            {console.log('Current ques: '+this.props.current_ques_no)}
                                            {console.log('')}

                                        </Text>

                                        <View style={fixStyles.textUnderLine} />

                                    </View>

                                    {console.log('')}
                                    {console.log('Criadno o card da pergunta ')}
                                    {console.log('')}

                                    <View style={styles.questionCard}>

                                        <Text style={[ fixStyles.fontContainer, styles.questionText ]}>
                                            {this.props.data.question}


                                            {console.log('')}
                                            {console.log('ques: '+this.props.data.question)}
                                            {console.log('')}

                                        </Text>

                                        {this._renderInput(this.props.data)}
                                    
                                    </View>

                                </View>

                                <View style={{flex: 0.2}}/>

                            </View>
                        </View>

                        {console.log('')}
                        {console.log('  CABOOOOOOO ')}
                        {console.log('')}

                        <TouchableOpacity style={styles.nextButton} onPress={() => {this._handleNextButton(this.props.data)}}>
                            <Text style={[fixStyles.fontContainer, styles.buttonStyle ]}>NEXT</Text>
                        </TouchableOpacity>

                    </KeyboardAvoidingView>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    questionContainer: {
        flex: 1,
        paddingHorizontal: 15,
        justifyContent: 'space-around',
        width: getWidthByPerc(100),
        height: getHeightByPerc(100),
         //backgroundColor: 'gray'//,tava comentado
    },

    questionCard: {
        flex: 8,//4
        marginTop: 10
    },

    questionText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.black
    },

    nextButton: {
        paddingVertical:10,
        backgroundColor: colors.blue,//white
    },

    buttonStyle: {
        textAlign: 'center',
        fontSize: 20,
        color: colors.black
    },

    numberStyle: {
        fontSize: 20,
        color: colors.black
    },

    inputStyle: {

        height: 40,
        borderBottomWidth: 3,
        borderBottomColor: colors.black,
        marginVertical: 10,
        color: colors.black,
        fontSize: 16,

        
    }
});

fontFapes = {

    data: PropTypes.object.isRequired,
    nextPress: PropTypes.func.isRequired,
    current_ques_no: PropTypes.number,
}

QuestionItem.defaultProps = {
    data: {},
    current_ques_no: 1
}


export default QuestionItem;