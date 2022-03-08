/* eslint-disable react/jsx-filename-extension */
/**
 * Created by charnjeetelectrovese@gmail.com on 3/22/2018.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image'
import fixStyles, {colors} from "../../styles/index.style";

class ListItem extends React.PureComponent {

    constructor(props) {
        super(props);
        this._handlePress = this._handlePress.bind(this);
    }
    componentDidMount() {
         // console.log(this.props.data.thumb_image)
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if(nextProps != this.props) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    _handlePress() {
        console.log(this.props.data);
        this.props.handleRowTouch(this.props.data)
    }
    render() {
        const item = this.props.data;
            const regex = /(<([^>]+)>)/ig;
            const result = item.title.rendered.substr(0, 150).replace(regex, '');
            return (
                <TouchableOpacity key={item._id} onPress={this._handlePress}>
                    <View style={styles.ListTile}>
                        {/*<Image style={styles.ListImage} source={{uri: item.thumb_image}}/>*/}

                        <View style={styles.listTileInfo}>
                            <Text style={[ fixStyles.fontContainer, styles.listTitle]}>{`${result}`}</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                {/*<Text style={[ fixStyles.fontContainer, styles.tagline]}>{item.type}</Text>*/}
                                {/*<Text style={[ fixStyles.fontContainer, styles.tagline]}>{item.date}</Text>*/}
                            </View>
                        </View>
                        <FastImage
                            style={styles.ListImage}
                            source={{
                                uri: item.thumb_image,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </View>
                </TouchableOpacity>
            )
    }
}

ListItem.propTypes = {
    data: PropTypes.object,
    handleRowTouch: PropTypes.func.isRequired
};
ListItem.defaultProps = {
    data: {},
};

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
export default ListItem