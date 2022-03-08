import { Dimensions, StyleSheet } from 'react-native'
import getGlobalStyle from '../../Style/GlobalStyle'

const getHomeStyle = (app_theme) => {

    const global_style = getGlobalStyle(app_theme)

    const perfil_styled = StyleSheet.create({
        ...global_style,

        Container: {
            ...global_style.Container,

            backgroundColor: app_theme.background_color,

            flexDirection: 'column',
            flexGrow: 1,
            alignItems: 'center',

            paddingBottom: 20,
        },

        PerfilImage: {
            width: 150,
            height: 150,
        },

        ImageBackgound: {

            marginTop: 25,
            marginBottom: 20,

            padding: 20,

            borderStyle: 'solid',
            borderColor: app_theme.default_background,
            borderRadius: 40,

            backgroundColor: app_theme.default_background,
        },

        InfoArea: {

            marginTop: 20,

            display: 'flex',

            borderStyle: 'solid',
            borderColor: app_theme.default_border_color,
            borderWidth: 3,
            borderRadius: 30,

            width: global_style.ScreenWidth - 40,

            flex: 1,

            padding: 30,
        },

        Header: {

            display: "flex",
            justifyContent: 'space-between',

            flexDirection: 'row',

            position: 'absolute',

            width: global_style.ScreenWidth,
            maxHeight: 90,

            borderStyle: 'solid',
            borderTopWidth: 12,
            borderColor: app_theme.default_border_color,

        },

        LeftHeader: {
            backgroundColor: app_theme.default_background,

            paddingTop: 5,
            paddingLeft: 5,
            paddingRight: 10,

            borderBottomEndRadius: 15,
        },

        RigthHeader: {
            backgroundColor: app_theme.default_background,

            paddingTop: 5,
            paddingRight: 10,
            paddingLeft: 10,

            borderBottomStartRadius: 15,
        },

        Icon: {
            maxWidth: 50,
            maxHeight: 50,
        }

    });

    const InfoFieldStyle = StyleSheet.create({
        Background: {
            marginTop: 20,
            marginBottom: 20
        }
    })

    const perfil_style = {
        ...perfil_styled,
        InfoFieldStyle,
    }

    return perfil_style;
}

export {getHomeStyle as default};
