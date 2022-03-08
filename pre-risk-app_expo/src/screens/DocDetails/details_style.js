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

            backgroundColor: app_theme.background_color,

            flexDirection: 'column',
            flexGrow: 1,
        },

        Message: {
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',

            marginLeft: 20,
            marginRight: 20,

            marginTop: 20,
            marginBottom: 5,

            paddingTop: 30,
            paddingBottom: 30,

            paddingLeft: 5,
            paddingRight: 5,

            minWidth: (width - 40),
            maxWidth: (width - 40),

            borderStyle: 'solid',
            borderColor: app_theme.default_border_color,
            borderWidth: 3,
            borderRadius: 25
        }

    });

    return home_style;
}

export {getHomeStyle as default};
