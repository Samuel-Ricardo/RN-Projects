import { StyleSheet } from 'react-native'
import getGlobalStyle from '../../style/Global_Style'

const getItemListStyle = (app_theme) => {

    const global_style = getGlobalStyle(app_theme)


    const item_list_style = StyleSheet.create({
        ...global_style,

        Background: {
        ...global_style.Container,
            backgroundColor: app_theme.background_color,

            marginTop: 0,
            marginBottom: 0,

            paddingBottom: 10,

            flexGrow: 1,

            alignSelf: 'auto',

            height: global_style.ScreenHeight - 20,


            borderStyle: "solid",
            borderColor: app_theme.default_border_color,
            borderWidth: 3,

            borderTopEndRadius: 15,
            borderTopStartRadius: 15
        },

        Header: {
            backgroundColor: app_theme.default_background,

            /*
            paddingRight: 21,
            paddingLeft: 20,
            paddingTop: 20,
            paddingBottom: 20,
            */

            paddingTop: 5,

            marginTop: -1,
            marginLeft: -2,

            borderTopEndRadius: 12,
            borderTopStartRadius: 10
        },

        HeaderFont: {
            ...global_style.P,
            fontWeight: "bold",
            textAlign: 'center',
        },

        Item: {
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            alignItems: 'center',
        },


    });

    return item_list_style;

};

export { getItemListStyle as default }
