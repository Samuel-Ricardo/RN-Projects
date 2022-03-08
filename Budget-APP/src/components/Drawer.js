import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Text,
	View,
	TouchableOpacity,
	ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles/Drawer';

class Drawer extends React.PureComponent {
	constructor(props) {
		super(props);

		this._goToMovies = this._goToMovies.bind(this);
		this._openSearch = this._openSearch.bind(this);
		this._handleCategoryClick = this._handleCategoryClick.bind(this);
		this._handleHome = this._handleHome.bind(this);
	}

	_openSearch() {
		this._toggleDrawer();
		// this.props.navigator.showModal({
		// 	screen: 'movieapp.Search',
		// 	title: 'Search'
		// });
	}

	_goToMovies() {
		this._toggleDrawer();
		// this.props.navigator.popToRoot({
		// 	screen: 'movieapp.Movies'
		// });
	}

	_toggleDrawer() {
		this.props.navigator.toggleDrawer({
			to: 'closed',
			side: 'left',
			animated: true
		});
	}
	_handleCategoryClick(obj) {
		this._toggleDrawer();
        this.props.navigator.push({
            screen: 'wp.CategoryPost', // unique ID registered with Navigation.registerScreen
            title: obj.name,
            passProps: { category_id: obj.id },
		});
	}
	_handleHome() {
        this._toggleDrawer();
        this.props.navigator.push({
            screen: 'wp.Home', // unique ID registered with Navigation.registerScreen
            title: 'Highlights',
        });
	}
    _renderHome() {
                return (<TouchableOpacity onPress={this._handleHome}>
					<View style={styles.drawerListItem}>
						<Text style={styles.drawerListItemText}>
                           Home
						</Text>
					</View>
				</TouchableOpacity>);
    }
	_renderCategories() {
		if(this.props.categories.length <= 0) {
			return <View style={{flex: 1, backgroundColor:'red'}}/>;
		} else {
			return this.props.categories.map((val) => {
				return (<TouchableOpacity key={val.id} onPress={() => { this._handleCategoryClick(val) }}>
					<View style={styles.drawerListItem}>
						<Text style={styles.drawerListItemText}>
							{val.name.toUpperCase()}
						</Text>
					</View>
				</TouchableOpacity>)
			});
		}
	}
	render() {
		return (
			<View style={styles.container}>
				<ScrollView style={{ flex: 1}}>
					<View style={styles.drawerList}>
                        {this._renderHome()}
						{this._renderCategories()}
					</View>
				</ScrollView>
				</View>
		);
	}
}

Drawer.propTypes = {
	navigator: PropTypes.object
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ }, dispatch);
}
function mapStateToProps(state) {
    return {
        is_fetching: state.categories.is_fetching,
        categories: state.categories.categories
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);

