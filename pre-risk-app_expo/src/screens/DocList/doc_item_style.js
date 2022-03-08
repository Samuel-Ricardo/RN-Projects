import { StyleSheet } from 'react-native'
import getGlobalStyle from '../../style/Global_Style'

const getDocItemStyle = (app_theme) => {

    const global_style = getGlobalStyle(app_theme)

    const doc_item_style = StyleSheet.create({
        ...global_style,

        Container: {
            ...global_style.Container,

            borderRadius: 10,
            borderWidth: 2,
            borderColor: app_theme.default_background,

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

            borderStyle: 'solid',
            borderColor: app_theme.default_border_color,
            borderWidth: 3,
            borderRadius: 25
        }

    });

    return doc_item_style;
}

export {getDocItemStyle as default};
