import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	linearGradient: {
		top: 0,
		left: 0,
		right: 0,
		height: 248,
		position: 'absolute'
	},
	imageBackdrop: {
		// flex: 1,
		height: 248,
		backgroundColor: 'black'
	},
	cardContainer: {
		flex:1,
		// position: 'absolute',
		// top: 32,
		// right: 16,
		// left: 16,
		// flexDirection: 'row'
		marginVertical: 5,
        marginHorizontal: 15,
		elevation: 2,
		backgroundColor: 'white',
		borderRadius: 15,

	},

	cardImage: {
		height: 150,
		borderRadius: 15,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	cardDetails: {
		flex: 1,
		paddingHorizontal: 10
	},
	cardTitle: {
		color: 'black',
		fontSize: 15,
        fontFamily: 'Roboto-Medium',
		paddingTop: 5
	},
	cardGenre: {
		flexDirection: 'row'
	},
	cardGenreItem: {
		fontSize: 11,
		marginRight: 5,
		color: 'white'
	},
	cardDescription: {
		color: '#f7f7f7',
		fontSize: 13,
		marginTop: 5
	},
	cardNumbers: {
		flexDirection: 'row',
		marginTop: 5
	},
	cardStar: {
		flexDirection: 'row'
	},
	cardStarRatings: {
		marginLeft: 5,
		fontSize: 12,
		color: 'white'
	},
	cardRunningHours: {
		marginLeft: 5,
		fontSize: 12
	},
	viewButton: {
		justifyContent: 'center',
		padding: 10,
		borderRadius: 3,
		backgroundColor: '#EA0000',
		width: 100,
		height: 30,
		marginTop: 10
	},
	viewButtonText: {
		color: 'white'
	}
});

export default styles;
