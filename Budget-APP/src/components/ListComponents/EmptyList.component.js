/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 19/04/18.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-native';
import fixStyles, { colors } from '../../styles/index.style';

class EmptyList extends Component {

    render() {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[ fixStyles.fontContainer, styles.topText]}>{this.props.topText}</Text>
            <Text style={[ fixStyles.fontContainer, styles.bottomText]}>{this.props.bottomText}</Text>
          </View>
        )
    }
}

const styles = StyleSheet.create({
   topText: {
       fontSize: 14,
       fontWeight: 'bold',
       marginVertical: 5
   },
    bottomText: {
       fontSize: 16,
        color: colors.black
    }
});

EmptyList.propTypes = {
    topText: PropTypes.string.isRequired,
    bottomText: PropTypes.string.isRequired,
};

export default EmptyList;