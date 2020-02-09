import React from 'react';
import { StyleProp, ImageStyle } from 'react-native';
import Image from 'react-native-remote-svg';

interface SvgImageProps {
	source: string;
	style?: StyleProp<ImageStyle>;
}

export default ({ source, style }: SvgImageProps) => (
	<Image
		source={source}
		style={style}
	/>
);
