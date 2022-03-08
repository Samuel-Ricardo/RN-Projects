/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 06/08/18.
 */
import React from 'react';
import { View } from 'react-native';
import Placeholder from 'rn-placeholder';

const customPlaceholder = props => {
    const { style } = props;
    return (
        <View style={style} />
    );
};

export default Placeholder.connect(customPlaceholder);