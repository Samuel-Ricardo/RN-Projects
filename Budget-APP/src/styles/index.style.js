import { StyleSheet } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD',
    appbackground: '#ffffff',
    charcol: '#434343',
    white: '#FFFFFF',
    ligthgrey: '#CDCDCD',
    lighterGrey: '#ECECEC',
    shadowGrey:'#f0f0f0',
    placeholderTextColor:'#94AFBE',
    inputColor: '#575757',
    red: '#ff0000',
    headerColor: '#FFFFFF',
    headerFontColor: '#000000',
    statusBarColor: '#ECECEC',
    blue: '#1999ED',
    backgroundBlue: '#05ABF5',
    backgroundGray: '#EBEBEB',
};

export default StyleSheet.create({
    textUnderLine: {
      width: 80,
        height: 3,
        backgroundColor: '#1999ED'
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listButton: {
        backgroundColor: colors.white,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 5,

    },
    langContainer: {
      flexDirection: 'row',
    },
    selectedLang: {
        backgroundColor: colors.headerColor,
        color: colors.white,
    },
    flex1: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        backgroundColor: colors.black
    },
    container: {
        flex: 1,
        backgroundColor: colors.background1
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1
    },
    exampleContainer: {
        paddingVertical: 0
    },
    exampleContainerDark: {
        backgroundColor: colors.black
    },
    exampleContainerLight: {
        backgroundColor: 'white'
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleDark: {
        color: colors.black
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginTop: 0,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingTop: 0,
        // paddingVertical: 0 // for custom animation
    },
    paginationContainer: {
        paddingVertical: 0
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 1
    },
    fontContainer: {
        fontFamily:'Roboto',
        color: colors.black
    }
});
