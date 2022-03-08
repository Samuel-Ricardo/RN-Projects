import { Dimensions, StyleSheet } from 'react-native'
import getGlobalStyle from '../../style/Global_Style'

const getHomeStyle = (app_theme) => {

    const global_style = getGlobalStyle(app_theme)

    const width = Dimensions.get('window').width; //full width
    const height = Dimensions.get('window').height; //full height

    const home_style = StyleSheet.create({
        ...global_style,

        Container: {
            ...global_style.Container,

            backgroundColor: app_theme.default_background,

            flexDirection: 'column',
            flexGrow: 1,
        },

        TextInput: {
            ...global_style.TextInput,

            marginTop: 25,
        },

        icon : {

            width: 100,
            height: 100
        }

    });

    return home_style;
}

export {getHomeStyle as default};
