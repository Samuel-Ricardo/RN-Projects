/**
 * Created by charnjeetelectrovese@gmail.com on 3/21/2018.
 */
import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


export function getWidthByPerc (percentage, offset = 0) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value - offset);
}

export function getHeightByPerc (percentage, offset = 0) {
    const value = (percentage * viewportHeight) / 100;
    return Math.round(value - offset);
}