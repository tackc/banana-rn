import { StyleSheet } from 'react-native';
import platformShadow from '@util/platformShadow';
import * as colors from '@util/colors';

const addButtonSize = 110;

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	addButton: {
		position: 'absolute',
		bottom: 60,
		right: 25,
		height: addButtonSize,
		width: addButtonSize,
		borderColor: 'white',
		borderRadius: addButtonSize / 2,
		borderWidth: 2,
		backgroundColor: colors.NAVY_BLUE,
		justifyContent: 'center',
		alignItems: 'center',
		...platformShadow(5),
	},
	plus: {
		fontFamily: 'open-sans-light',
		fontSize: 110,
		color: colors.BANANA_YELLOW,
		bottom: 24,
	},
});
