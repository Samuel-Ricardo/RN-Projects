/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 02/08/18.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import fixStyle, { colors } from '../styles/index.style';
import ListComponent from '../components/ListComponents/List.component';
import { serviceGetCategoryPosts } from '../services/Home.service';
import { getImageFromContent } from '../util/Common.util';

class CategoryPosts extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            is_fetching: true,
            refreshing: false,
            data: [],
            page_id: 1,
            is_end: false,
            is_first_loaded: false
        }
        this._handleListEnd = this._handleListEnd.bind(this);
        this._handleRowTouch = this._handleRowTouch.bind(this);
    }

    componentDidMount() {
        this.makeRequest();
    }
    makeRequest() {
        const { page_id } = this.state;
        console.log('makerequest');
        if(!this.state.is_end ) {
            this.setState({ is_fetching: true });
            serviceGetCategoryPosts({ categories: this.props.category_id, page: this.state.page_id }).then((data) => {
                console.log('category data', data);
                if (!data.error) {
                    if(data.data.length > 0) {
                        const tempData = data.data.map((val) => {
                            const tempImages = getImageFromContent(val.content.rendered);
                            return { ...val,
                                thumb_image: tempImages.thumb_image,
                                header_image: tempImages.header_image,
                                all_images: tempImages.all_images,
                            }
                        })

                    this.setState({
                        data: page_id === 0 ? tempData : [...this.state.data, ...tempData],
                        is_fetching: false,
                        refreshing: false,
                        page_id: parseInt(this.state.page_id) + 1,
                        is_first_loaded: true
                    });
                } else {
                    this.setState({ is_fetching: false, refreshing: false, is_end: true });
                }
            }});
        }
    }
    _handleRowTouch(data) {
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
        if(!this.state.is_fetching) {
            this.makeRequest();
        }
    }
    _renderList() {
        if(this.state.is_fetching && this.state.data.length <= 0 && false) {
            return (
                <ScrollView>
                    <View style={fixStyle.loadingView}>
                        <ActivityIndicator size={'large'}/>
                    </View>
                </ScrollView>
            )
        } else {
            return (
                <ListComponent
                    data={this.state.data}
                    handleRowTouch={this._handleRowTouch}
                    is_fetching={this.state.is_fetching}
                    handleEndReached={this._handleListEnd}
                    is_first_loaded={this.state.is_first_loaded}
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

CategoryPosts.propTypes = {
};

export default (CategoryPosts);
