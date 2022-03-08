/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 06/08/18.
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Placeholder from 'rn-placeholder';
import fixStyles, {colors} from "../../styles/index.style";
import FadeView from '../FadeView';

export default  class PlaceholderItem extends React.PureComponent {
    render() {
        return (
                <View style={styles.ListTile}>
                    <View style={styles.listTileInfo}>
                        <FadeView style={{ flex: 1 }}/>
                    </View>
                    <FadeView style={{ flex: 1, height: 90 }}/>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    ListTile: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        borderRadius: 5,
        // borderWidth: 1,
        // borderColor: colors.lighterGrey,
        borderBottomWidth: 0,
        marginHorizontal: 15,
        paddingVertical: 10,
        // marginBottom: 8,
        // elevation: 3,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 0.4,
        // shadowRadius: 1,
        // overflow: 'hidden'

    },
    ListImage: {
        width: 90,
        height: 90,
        alignSelf: 'center',
        borderRadius: 5,
    },
    listTileInfo: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 2,
        paddingRight: 10,
        paddingVertical: 0,
    },
    listTitle: {
        fontSize: 15,
        fontFamily: 'Roboto-Medium',
        color: colors.black,
    },
    ListDescription: {
        fontSize: 12,
        color: colors.black
    },
    ListRightIcons: {
        justifyContent: 'flex-end',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    tagline: {
        color: colors.black,
        fontSize: 10
    }
});