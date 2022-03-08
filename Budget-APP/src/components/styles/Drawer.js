import { StyleSheet } from 'react-native';
import { colors } from '../../styles/index.style';
import { getWidthByPerc } from '../../styles/StyleUtils.style';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 15,
		paddingVertical: 15,
		justifyContent: 'center',
		backgroundColor: colors.headerColor,
	},
	drawerList: {
		width: getWidthByPerc(80),
	},
	drawerListIcon: {
		width: 27
	},
	drawerListItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 23,

	},
	drawerListItemText: {
        color: colors.headerFontColor,
		fontWeight: 'bold',
		fontSize: 16,
		paddingLeft: 15,
		flex: 1
	},
	linearGradient: {
		// top: 0,
		// left: 0,
		// right: 0,
		// height: 248,
		// position: 'absolute'
		flex: 1
	},
	_version: {
		color: '#3c3c3c',
		position: 'absolute',
		bottom: 25,
		// marginLeft: 53
	}
});

export default styles;