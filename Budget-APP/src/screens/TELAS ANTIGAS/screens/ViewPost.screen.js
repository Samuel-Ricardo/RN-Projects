/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 26/07/18.
 */
import React, { Component } from 'react';
import { ScrollView, Dimensions, StyleSheet, Animated, View, TouchableOpacity, Image, InteractionManager, ActivityIndicator, Platform } from 'react-native';
import HTML from 'react-native-render-html';
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';
import Icon from 'react-native-vector-icons/Ionicons';
import PhotoView from "@merryjs/photo-viewer";
import { colors } from '../styles/index.style';
import { getWidthByPerc } from '../styles/StyleUtils.style';
import SmartImage from '../components/SmartImage.component';

const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 64 : 54;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const ignoredTags = [...IGNORED_TAGS, 'iframe', 'blockquote'];

class ViewPost extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
            interactionsComplete: false,
            visible: false,
            initial: 0,
            images_data: [],
        };
        this._handleBackButton = this._handleBackButton.bind(this);
        this._handleImageClick = this._handleImageClick.bind(this);
    }

    componentDidMount() {
        // this.props.navigator.toggleNavBar({
        //     to: 'hidden',
        //     animated: true
        // })
        InteractionManager.runAfterInteractions(() => {
            const tempData = this.props.data.all_images.map((val) => {
               return {
                   source: {
                       uri: val,
                   }
               }
            });
            this.setState({interactionsComplete: true, images_data: tempData});
        });

    }
    _handleBackButton() {
        this.props.navigator.dismissModal({
            animationType: 'slide-down'
        });
    }
    _handleImageClick(src) {
        const { all_images } = this.props.data;
        const tempNum = all_images.indexOf(src);
        if( tempNum >= 0) {
            this.setState({ visible: true, initial: tempNum });
        }
    }
    _renderImageViewer() {
        if(this.state.images_data.length > 0) {
            return (
                <PhotoView
                    visible={this.state.visible}
                    data={this.state.images_data}
                    hideStatusBar={false}
                    initial={this.state.initial}
                    onDismiss={e => {
                        // don't forgot set state back.
                        this.setState({ visible: false });
                    }}
                />
            );
        }
        return null;
    }
    //this.props.data.content.rendered
    render () {

        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
        });
        const imageOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -50],
            extrapolate: 'clamp',
        });
        if (this.state.interactionsComplete) {
            return (
                <View style={ styles.fill }>
                    {this._renderImageViewer()}
                    <ScrollView
                        style={styles.fill}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                        )}
                    >
                        <View style={styles.scrollViewContent}>
                            <HTML containerStyle={styles.htmlContainer} baseFontStyle={{fontSize: 16, color: '#000000'}} html={this.props.data.content.rendered+'<hr/>'}
                                  ignoredStyles={['display', 'width', 'height', 'font-family', 'padding']}
                                  imagesInitialDimensions={{width: 100, height: 100}}
                                  imagesMaxWidth={(Dimensions.get('window').width - 20)}
                                  tagsStyles={{ iframe: { width:(Dimensions.get('window').width - 20), height: 200 } } }
                                  renderers={{
                                      img: (htmlAttribs, children, convertedCSSStyles, passProps) => {
                                          return (<TouchableOpacity style={{flex: 1}} onPress={() => { this._handleImageClick(htmlAttribs.src)}}>
                                              <SmartImage
                                                  imagesMaxWidth={(Dimensions.get('window').width - 20)}
                                                  source={{ uri: htmlAttribs.src }}/>
                                          </TouchableOpacity>);
                                      }
                                  }}
                            />
                        </View>
                    </ScrollView>
                    <Animated.View style={[styles.header, {height: headerHeight}]}>
                        <Animated.Image
                            style={[
                                styles.backgroundImage,
                                {opacity: imageOpacity, transform: [{translateY: imageTranslate}]},
                            ]}
                            source={{uri: this.props.data.header_image}}
                        />
                        <Animated.View style={styles.bar}>
                            <TouchableOpacity style={{ padding : 3}} onPress={this._handleBackButton}>
                                <Icon name="md-arrow-back" size={26} color={colors.headerFontColor} style={[styles.backButton]} />
                            </TouchableOpacity>
                        </Animated.View>
                    </Animated.View>
                </View>
            );
        }
        return (<View style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: colors.appbackground
    },
    fill: {
        flex: 1,
        backgroundColor: colors.appbackground
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.headerColor,
        overflow: 'hidden',
    },
    bar: {
        // marginTop: 24,
        height: 56,
        // alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        marginLeft: 10
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: getWidthByPerc(100),
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    htmlContainer: {
        paddingHorizontal: 10
    }
});
export default ViewPost;