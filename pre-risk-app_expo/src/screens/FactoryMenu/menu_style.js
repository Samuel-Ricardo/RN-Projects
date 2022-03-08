import { Dimensions, StyleSheet } from 'react-native'
import getGlobalStyle from '../../style/Global_Style'

const getFactoryMenuStyle = (app_theme) => {

    const global_style = getGlobalStyle(app_theme)

    const width = Dimensions.get('window').width; //full width
    const height = Dimensions.get('window').height; //full height

    const menu_style = StyleSheet.create({
        ...global_style,

        Container: {
            ...global_style.Container,

            backgroundColor: app_theme.background_color,

            flexDirection: 'column',
            flexGrow: 1,

            width: width,
            height: height
        },
    });

    return menu_style;
}

export {getFactoryMenuStyle as default};
