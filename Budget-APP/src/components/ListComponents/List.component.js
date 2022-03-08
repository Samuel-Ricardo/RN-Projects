/**
 * Created by charnjeetelectrovese@gmail.com on 3/22/2018.
 */
import React  from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, ActivityIndicator, Text, Image, StyleSheet, Platform } from 'react-native';
import Swiper from 'react-native-swiper';
import fixStyles, {colors} from "../../styles/index.style";
import ListItem from './ListItem.component';
import { getWidthByPerc } from '../../styles/StyleUtils.style';
import CardOne from '../Cards/CardOne.component';
import Constants from '../../config/Constants.config';
import PlaceholderItem from './PlaceholderItem.component';
import CardPlaceholder from '../Cards/CardOnePlaceholder.component';
import FadeView from '../FadeView';

const VIEWABILITY_CONFIG = {
    minimumViewTime: 3000,
    viewAreaCoveragePercentThreshold: 100,
    waitForInteraction: true,
}
class ListComponent extends React.PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
        };
        this.renderItem = this.renderItem.bind(this);
        this._viewPost = this._viewPost.bind(this);
    }
    componentWillMount() {

    }
    getItemLayout = (data, index) => (
        { length: 108, offset: 108 * index, index }
    )
    renderSeparator = () => {
        return (
          <View
            style={{
                    height: 1,
                    width: getWidthByPerc(100, 30),
                    backgroundColor: colors.lighterGrey,
                    marginLeft: 15
                }}
          />
        );
    };
    _viewPost(data){
        this.props.handleRowTouch(data);
    }
    _renderCardView() {

        if(this.props.data.length > 0) {
           return (this.props.banners).map(info => (
                <CardOne key={info.id} info={info} viewPost={this._viewPost} />
            ));
        } else {
            return (<View/>)
        }

    }
    renderHeader = () => {
        //borderBottomWidth: 2, borderColor: colors.lighterGrey,
        if(this.props.is_banner) {
            if(this.props.is_first_loaded) {
                return (
                    <View style={{flex: 1, marginTop: Platform.OS == 'ios' ? 64 : 60}}>
                        <Swiper
                            autoplay={false}
                            autoplayTimeout={4}
                            showsPagination={false}
                            height={220}
                        >
                            {this._renderCardView()}
                        </Swiper>
                    </View>
                );
            } else {
                return (
                    <FadeView style={{marginTop: Platform.OS == 'ios' ? 64 : 60, height: 220, flex: 1, backgroundColor: colors.lighterGrey }}/>
                );
            }
        } else {
            return (
                <View />
            //    style={{ height: Platform.OS == 'ios' ? 64 : 60 }}
            )
        }
    };

    renderFooter = () => {
        if(this.props.is_fetching) {
            return (
              <View
                style={{
                        paddingVertical: 20,
                        borderTopWidth: 1,
                        borderColor: "#CED0CE"
                    }}
              >
                <ActivityIndicator animating size="large" />
              </View>
            );
        } else {
            return null;
        }
    };
    renderItem({ item })  {

        if(this.props.is_first_loaded) {
            return (
                <ListItem
                    data={item}
                    handleRowTouch={this.props.handleRowTouch}
                />
            );
        } else {
            return (<PlaceholderItem />)
        }
    }

    /*
     initialNumToRender={6}
     onRefresh={this.handleRefresh}
     refreshing={this.state.refreshing}
     onEndReached={this.handleLoadMore}
     onEndReachedThreshold={0.5}
     */
    render () {
        return (
          <FlatList
            onRefresh={this.props.handle_refresh}
            refreshing={this.props.is_refreshing}
            data={this.props.data.length > 0 ? this.props.data : Constants.DEFAULT_DATA}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader.bind(this)}
            ListFooterComponent={this.renderFooter}
            getItemLayout={this.getItemLayout}
            initialNumToRender={6}
            onEndReachedThreshold={1}
            onEndReached={(distance) => { this.props.handleEndReached(distance)}}
            viewabilityConfig={VIEWABILITY_CONFIG}
            removeClippedSubviews
          />
        )
    }
}
// windowSize={12}
// maxToRenderPerBatch={6}

ListComponent.propTypes = {
    is_fetching: PropTypes.bool,
    data: PropTypes.array.isRequired,
    banners: PropTypes.array,
    is_banner: PropTypes.bool,
    handleRowTouch: PropTypes.func.isRequired,
    handleEndReached: PropTypes.func.isRequired,
};

ListComponent.defaultProps = {
    is_fetching: false,
    header_text: '',
    banners: [],
    is_banner: false
};

const styles = StyleSheet.create({
    listHeaderText: {
        color: colors.black,
        paddingLeft: 10,
        paddingVertical: 5
    }

});
export default ListComponent;