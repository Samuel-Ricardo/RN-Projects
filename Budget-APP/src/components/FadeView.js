import React from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

const START_VALUE = 0.5;
const END_VALUE = 1;
const DURATION = 500;
const useNativeDriver = true;

/**
 * Create a repetitive fadein / fadeout animation
 */
const Fade = ({ children, style }) => {
    const animation = new Animated.Value(START_VALUE);

    function start() {
        Animated.sequence([
            Animated.timing(animation, {
                toValue: END_VALUE,
                duration: DURATION,
                useNativeDriver,
            }),
            Animated.timing(animation, {
                toValue: START_VALUE,
                duration: DURATION,
                useNativeDriver,
            }),
        ]).start((e) => {
            if (e.finished) {
                start();
            }
        });
    }

    start();
    const styles = { opacity: animation, backgroundColor: '#efefef' };
    return <Animated.View style={[styles, style]}></Animated.View>;
};

Fade.propTypes = {
    children: PropTypes.shape({}),
};

Fade.defaultProps = {
    children: null,
};

export default Fade;