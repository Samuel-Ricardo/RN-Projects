/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 18/09/18.
 */
import React from 'react';
import { TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native';

class CustomButton extends React.PureComponent {
    render() {
        if(Platform.OS == 'ios')
            return <TouchableOpacity style={this.props.style} onPress={this.props.onPress}>{this.props.children}</TouchableOpacity>;

        return <TouchableNativeFeedback style={this.props.style} onPress={this.props.onPress}>{this.props.children}</TouchableNativeFeedback>;

    }
}
export default CustomButton;