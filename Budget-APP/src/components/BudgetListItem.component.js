/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 29/09/18.
 */
import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import StylesObj, { colors } from '../styles/index.style';

export default class BudgetListItem extends React.PureComponent {
    isEquivalent(a, b) {
        // Create arrays of property names
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);

        // If number of properties is different,
        // objects are not equivalent
        if (aProps.length != bProps.length) {
            return false;
        }

        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];

            // If values of same property are not equal,
            // objects are not equivalent
            if (a[propName] !== b[propName]) {
                return false;
            }
        }

        // If we made it this far, objects
        // are considered equivalent
        return true;
    }
    constructor(props) {
        super(props);
        this.state = {
            percentage: 0,
            amount: 0,
            title: '',
        };
        this._handleAmount = this._handleAmount.bind(this);
        this._handlePercentage = this._handlePercentage.bind(this);
        this._handleTitle = this._handleTitle.bind(this);
    }

    componentDidMount() {
        const { percentage, amount, title } = this.props.rowData;
        this.setState({
            percentage: percentage,
            amount: amount,
            title: title,
        });
    }

    componentWillUpdate(nextProps, nextState) {
        if(!this.isEquivalent(nextProps.rowData, this.props.rowData)) {
            const { percentage, amount, title } = nextProps.rowData;
            this.setState({
                percentage: percentage,
                amount: amount,
                title: title,
            });
        }
    }

    _returnStringData(data) {
        return data  ? parseInt(data).toString() : "0";
    }
    _handleAmount(text, rowId) {
        console.log('amount sum',this.props.max_amount + this.state.amount);
        if((parseFloat(this.props.max_amount) + parseFloat(this.state.amount)) >= parseFloat(text ? text : 0)) {
            this.setState({amount: (text ? text: 0)}, () => {
                this.props.handleTextChange('amount', text, rowId)
            });
        } else {
            this.props.callNotificationMethod('Amount must be less than or equal to '+ parseInt(this.props.max_amount + this.state.amount))
        }
    }
    _handlePercentage(text, rowId) {
        console.log('percentage change', text);
        console.log('percentage old', this.state.percentage);
        console.log('percentage sum', (this.props.max_percentage + this.state.percentage));
        if((parseFloat(this.props.max_percentage) + parseFloat(this.state.percentage)) >= parseFloat(text ? text : 0)) {
            console.log('allowed text', text);
            // if(parseFloat(text) >= 0) {
                this.setState({percentage: (text ? text: 0)}, () => {
                    this.props.handleTextChange('percentage', text, rowId)
                });
            // }
        } else {
            this.props.callNotificationMethod('Percentage must be less than or equal to '+ parseInt(this.props.max_percentage + this.state.percentage))
        }
    }
    _handleTitle(text, rowId) {
        this.setState({ title: text }, () => {
            this.props.handleTextChange('title', text, rowId)
        });
    }
    _renderAmountInput(rowData, rowId) {
        if(!rowData.is_locked) {
            return (<TextInput
                keyboardType={'numeric'}
                style={[styles.amountInput, styles.inputUnderLine]}
                value={this._returnStringData(this.state.amount)}
                onChangeText={(text) => { this._handleAmount(text, rowId)} }
            />);
        }
        return (
            <Text style={[StylesObj.fontContainer, styles.listText, styles.amountInput, { color: colors.backgroundBlue}]}>{parseInt(this.state.amount)}</Text>
        )
    }
    _renderPercentageData(rowData, rowId) {
        if(!rowData.is_locked) {
            return ( <TextInput
                keyboardType={'numeric'}
                style={[styles.percentageInput, styles.inputUnderLine]}
                value={this._returnStringData(this.state.percentage)}
                onChangeText={(text) => { this._handlePercentage(text, rowId)} }
            />);
        }
        return (
            <Text style={[StylesObj.fontContainer, styles.listText, styles.percentageInput, { color: colors.backgroundBlue , paddingVertical: 5, paddingHorizontal: 5}]}>{parseInt(this.state.percentage)}</Text>
        );
    }

    _renderTitleData(rowData, rowId) {
        if(!rowData.is_locked && rowData.is_new) {
            return ( <TextInput
                style={[styles.titleInput, styles.inputUnderLine, {color: colors.black}]}
                value={(this.state.title)}
                onChangeText={(text) => { this._handleTitle(text, rowId)} }
            />);
        }
        return (
            <Text style={[StylesObj.fontContainer, styles.listText]}>{this.state.title}</Text>
        );
    }

    render() {
        const {rowData, rowId} = this.props;
        return (
            <View>
                <View style={ [styles.flexRow, styles.paddingVertical] }>
                    <View style={styles.row}>
                        <TouchableOpacity style={{ paddingVertical: 5, paddingHorizontal:5, paddingRight: 10 }} onPress={() => {
                            this.props.handleLock(rowId);
                            // highlightRow(sectionId, rowId);
                        }}
                        >
                            {rowData.is_locked ? <Image style={styles.lockImage}  source={require('../resources/ic_lock_enable.png')} /> : <Image style={styles.lockImage} source={require('../resources/ic_lock_diable.png')} />}
                        </TouchableOpacity>
                        {this._renderPercentageData(rowData, rowId)}
                        <Text style={{ color: colors.backgroundBlue, marginRight: 5 }}> % </Text>
                        {this._renderTitleData(rowData, rowId)}
                    </View>
                    <View style={styles.row}>

                        <Text style={[StylesObj.fontContainer, styles.listText]}>$ </Text>
                        {this._renderAmountInput(rowData, rowId)}
                    </View>

                </View>
                <View style={{ height: 2, flex: 1, backgroundColor: colors.backgroundGray }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    thumb: {
        width: 35,
        height: 35,
    },
    text: {
        flex: 1,
        paddingLeft: 10,
        fontSize: 18,
        color: colors.black
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
    lockImage: {
        width: 15,
        height: 20,
    },
    percentageInput: {
        minWidth: 20,
        paddingVertical: 0,
        textAlign: 'center',
    },
    amountInput: {
        minWidth: 20,
        paddingVertical: 0,
        textAlign: 'center',
    },
    titleInput: {
        width: 100,
        paddingVertical: 0,
    },
    inputUnderLine: {
        // borderBottomColor: colors.blue,
        // borderBottomWidth: 1,
        color: colors.backgroundBlue
    }
});