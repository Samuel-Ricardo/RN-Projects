import { StyleSheet } from 'react-native'
import getGlobalStyle from '../../style/Global_Style'

const getDocItemStyle = (app_theme) => {

    const global_style = getGlobalStyle(app_theme)

    const { width, height } = global_style.getDimensions();

    const base_style = StyleSheet.create({
        ...global_style,

        Container: {
            ...global_style.Container,
            ...global_style.Shadow,

            padding: 10,

            marginBottom: 30,

            backgroundColor: app_theme.background_color,
            //backgroundColor: 'blue',

            width: width - 28,


            borderRadius: 10,
            //borderWidth: 2,
            //borderColor: app_theme.default_background,


            flexDirection: 'column',
            flex: 0,
            flexGrow: 0,

            alignSelf: 'baseline',
        },

        Section: {
            display: 'flex',
            flex: 0,
            flexDirection: 'column',
            alignSelf: 'baseline',

        },

        Header: {

            maxHeight: 25,

            display: 'flex',
            
            flex: 1,

            //backgroundColor: 'red',

            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'space-between',
        },

        Content: {

            display: 'flex',
            flex: 1,
            alignSelf: 'baseline',
            //alignItems: 'center',
            //alignSelf:'stretch',
            margin: 10,
        },

    });

    const driver_style = StyleSheet.create({
        icon: {
            maxWidth: 25,
            maxHeight: 25,
        }
    });

    const helper_style = StyleSheet.create({

    });

    const vehicle_style = StyleSheet.create({

    });

    const doc_item_style = {

        _: base_style,

        driver_style,
        helper_style,
        vehicle_style
    }

    return doc_item_style;
}

export { getDocItemStyle as default };
