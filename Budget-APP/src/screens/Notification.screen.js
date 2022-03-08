/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 01/11/18.
 */
import React from 'react';
import {StyleSheet, View, Text, Dimensions, Button} from 'react-native';
import { getWidthByPerc } from '../styles/StyleUtils.style';
class Notification extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.content}>{this.props.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: getWidthByPerc(100,0),
        backgroundColor: '#ff505c',
        padding: 16,
        // margin: 10,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
    },
    content: {
        textAlign: 'center',
        marginTop: 10,
    },
});

export default Notification;
