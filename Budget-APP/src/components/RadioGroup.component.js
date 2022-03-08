/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 18/09/18.
 */
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../styles/index.style';
import { getWidthByPerc } from '../styles/StyleUtils.style';

export default class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radioButtons: this.validate(this.props.radioButtons),
        };
    }

    validate(data) {
        let selected = false; // Variable to check if "selected: true" for more than one button.
        data.map(e => {
            e.color = e.color ? e.color : colors.white;
            e.disabled = e.disabled ? e.disabled : false;
            e.label = e.label ? e.label : 'You forgot to give label';
            e.labelColor = e.labelColor ? e.labelColor : colors.white;
            e.layout = e.layout ? e.layout : 'row';
            e.selected = e.selected ? e.selected : false;
            if (e.selected) {
                if (selected) {
                    e.selected = false; // Making "selected: false", if "selected: true" is assigned for more than one button.
                    console.log('Found "selected: true" for more than one button');
                } else {
                    selected = true;
                }
            }
            e.size = e.size ? e.size : 24;
            e.value = e.value ? e.value : e.label;
        });
        if (!selected && (this.props.category.toLowerCase() != 'amount')) {
            data[0].selected = true;
        }
        return data;
    }

    onPress = label => {
        const radioButtons = this.state.radioButtons;

        const selectedIndex = radioButtons.findIndex(e => e.selected == true);
        const selectIndex = radioButtons.findIndex(e => e.value == label.value);

        if (selectedIndex != selectIndex) {

            if(selectedIndex >= 0) {
                radioButtons[selectedIndex].selected = false;
            }

            radioButtons[selectIndex].selected = true;
            this.setState({ radioButtons });
            // this.props.onPress(this.state.radioButtons);
            this.props.onPress(label);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: this.props.flexDirection }}>
                    {this.state.radioButtons.map(data => (
                        <RadioButton
                            key={data.label}
                            data={data}
                            onPress={this.onPress}
                            category={this.props.category}
                        />
                    ))}
                </View>
            </View>
        );
    }
}

class RadioButton extends Component {

    render() {
        const data = this.props.data;
        const opacity = data.disabled ? 0.2 : 1;
        let layout = { flexDirection: 'row' };
        let margin = { marginLeft: 10 };
        if (data.layout === 'column') {
            layout = { alignItems: 'center' };
            margin = { marginTop: 10 };
        }
        if((this.props.category.toLowerCase() != 'amount' && false) ) {
            return (
                <TouchableOpacity
                    style={[layout, {opacity, marginVertical: 10}]}
                    onPress={() => {
                        data.disabled ? null : this.props.onPress(data);
                    }}>
                    <View
                        style={[
                            styles.border,
                            {
                                borderColor: data.color,
                                width: data.size,
                                height: data.size,
                                borderRadius: data.size / 2,
                                alignSelf: 'center'
                            },
                        ]}>
                        {data.selected &&
                        <View
                            style={{
                                backgroundColor: data.color,
                                width: data.size / 2,
                                height: data.size / 2,
                                borderRadius: data.size / 2,
                            }}
                        />}
                    </View>
                    <Text style={[{alignSelf: 'center'}, margin, {color: data.labelColor}]}>{data.label}</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    style={[styles.nextButton,data.selected ? { backgroundColor: 'white' } : {} ,{ opacity, marginVertical: 10}]}
                    onPress={() => {
                        data.disabled ? null : this.props.onPress(data);
                    }}>
                    <Text style={[{alignSelf: 'center'},data.selected ? { color: 'black', fontWeight: 'bold' } : {color: colors.white}]}>{data.label}</Text>
                </TouchableOpacity>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    border: {
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButton: {
        paddingVertical:10,
        width: getWidthByPerc(100, 40),
        borderWidth: 1,
        borderColor: colors.white,
        borderStyle: 'solid'
    },
});