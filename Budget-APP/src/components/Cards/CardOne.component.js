/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 01/08/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../styles/CardOne';

const iconStar = (<Icon name="md-star" size={16} color="#F5B642" />);

const CardOne = ({ info, viewPost }) => (
    <View style={styles.cardContainer}>
        <TouchableOpacity onPress={viewPost.bind(this, info)} style={{ flex: 1 }}>
            <Image resizeMode={'cover'} source={{ uri: `${info.thumb_image}` }} style={styles.cardImage} />
            <View style={styles.cardDetails}>
                <Text style={styles.cardTitle} numberOfLines={2}>
                    {info.title.rendered}
                </Text>
                {/*<TouchableOpacity activeOpacity={0.9} onPress={viewPost.bind(this, info.id)}>*/}
                {/*<View style={styles.viewButton}>*/}
                {/*<Text style={styles.viewButtonText}>View Details</Text>*/}
                {/*</View>*/}
                {/*</TouchableOpacity>*/}
            </View>
        </TouchableOpacity>
    </View>
);

CardOne.propTypes = {
    info: PropTypes.object.isRequired,
    viewPost: PropTypes.func.isRequired
};

export default CardOne;
