import { Dimensions, StyleSheet } from 'react-native'
import getGlobalStyle from '../../style/Global_Style'

const getDriveFactoryStyle = (app_theme) => {

    const global_style = getGlobalStyle(app_theme)

    const { width, heigth } = global_style.getDimensions();

    const drive_style = StyleSheet.create({
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

    return drive_style;
}

export {getDriveFactoryStyle as default};
