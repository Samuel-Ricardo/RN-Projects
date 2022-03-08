/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 23/07/18.
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import KeyboardManager from 'react-native-keyboard-manager';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import fixStyle, { colors } from '../styles/index.style';
import ListComponent from '../components/ListComponents/List.component';
import { actionUpdateHomeData } from '../actions/Home.action';
import ShineView from '../components/FadeView';

class HomeScreen extends PureComponent {
    constructor(props) {
        super(props);
        this._handleListEnd = this._handleListEnd.bind(this);
        this._handleRowTouch = this._handleRowTouch.bind(this);
    }

    componentDidMount() {

    }
    _handleRowTouch(data) {
        console.log(data);
        this.props.navigator.showModal({
            screen: 'wp.ViewPost',
            title: 'Detail',
            passProps: { data: data },
            navigatorStyle: {
                navBarHidden: true
            }
        });
    }
    _handleListEnd(distance) {
        if(!this.props.is_fetching) {
            this.props.actionUpdateHomeData({page: this.props.page_id});
        }
    }
    _renderList() {
        if((this.props.is_fetching && this.props.data.length <= 0 && false)) {
            return (
                <ShineView style={{ height: 200, backgroundColor: 'red'}} />
            );
            // return (
            //     <ScrollView>
            //         <View style={fixStyle.loadingView}>
            //             <ActivityIndicator size={'large'}/>
            //         </View>
            //     </ScrollView>
            // )
        } else {
            return (
                <ListComponent
                    is_banner
                    banners={this.props.banners}
                    data={this.props.data}
                    handleRowTouch={this._handleRowTouch}
                    is_fetching={this.props.is_fetching}
                    handleEndReached={this._handleListEnd}
                    is_first_loaded={this.props.is_first_loaded}
                />
            );
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.appbackground }}>
                {this._renderList()}
            </View>
        );
    }
}

HomeScreen.propTypes = {
    is_fetching: PropTypes.bool,
    data: PropTypes.array,
    page_id: PropTypes.number,
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ actionUpdateHomeData: actionUpdateHomeData }, dispatch);
}
function mapStateToProps(state) {
    return {
        page_id: state.home.page_id,
        is_fetching: state.home.is_posts_fetching,
        data: state.home.posts,
        banners: state.home.banners,
        is_first_loaded: state.home.is_first_loaded
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
