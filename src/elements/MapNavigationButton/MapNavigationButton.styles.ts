import { StyleSheet } from 'react-native';
import * as colors from '@util/colors';

export default active => StyleSheet.create({
	container: {
		height: 30,
		width: 75,
		backgroundColor: active ? colors.NAVY_BLUE : colors.BANANA_YELLOW,
		borderColor: colors.NAVY_BLUE,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		textAlign: 'center',
		color: active ? colors.BANANA_YELLOW : colors.NAVY_BLUE,
	},
});
