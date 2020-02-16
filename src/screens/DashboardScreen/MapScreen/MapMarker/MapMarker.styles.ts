import { StyleSheet } from 'react-native';
import * as colors from '@util/colors';

const iconSize = 44;

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	iconContainer: {
		width: iconSize,
		height: iconSize,
		backgroundColor: colors.NAVY_BLUE,
		borderRadius: iconSize / 2,
		borderWidth: 1.5,
		borderColor: 'white',
	},
	icon: {
		// width: iconSize * 2,
		// height: iconSize * 2,
	},
	textContainer: {
		flexDirection: 'column',
		width: 150,
		marginLeft: 5,
	},
	topText: {
		fontFamily: 'open-sans-bold',
		fontSize: 14,
		color: colors.NAVY_BLUE,
	},
	bottomText: {
		fontFamily: 'open-sans-regular',
		fontSize: 14,
		color: colors.NAVY_BLUE,
	},
});
