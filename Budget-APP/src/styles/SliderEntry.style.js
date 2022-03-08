import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './index.style';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

export const slideHeight = viewportHeight * 0.30;
const slideWidth = wp(100);
const itemHorizontalMargin = wp(0);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 0;

export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 5 // needed for shadow
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        bottom: 18,
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: entryBorderRadius
    },
    imageContainer: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        // backgroundColor: 'white',
        borderRadius: entryBorderRadius,
        overflow: 'hidden',

    },
    imageContainerEven: {
        // backgroundColor: colors.black
    },
    topImage: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain',
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: IS_IOS ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius,
    },
    // image's border radius is buggy on iOS; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: 'white'
    },
    radiusMaskEven: {
        backgroundColor: colors.black
    },
    textContainer: {
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingHorizontal: 16,
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius,
        position: 'absolute',
        bottom: 5,
        width: slideWidth,
        left: wp(2),
        flexDirection: 'row'
    },
    textContainerEven: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    title: {
        color: colors.black,
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        marginLeft: 5

    },
    titleEven: {
        color: 'white'
    },
    subtitle: {
        marginTop: 6,
        color: colors.gray,
        fontSize: 12,
        fontStyle: 'italic'
    },
    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.7)'
    }
});
