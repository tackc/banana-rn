import { Dimensions, StyleSheet } from 'react-native';
import * as colors from '@util/colors';
import platformShadow from '@util/platformShadow';

const iconSize = 90;

const { width } = Dimensions.get('screen');

export default StyleSheet.create({
	outerContainer: StyleSheet.absoluteFillObject,
	mapView: StyleSheet.absoluteFillObject,
	header: {
		position: 'absolute',
		top: 0,
		width,
	},
});
