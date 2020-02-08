import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { View } from 'react-native';
import { SvgImage } from '@elements';
import styles from './MapMarker.styles';

export default () => {
	const { navigate } = useNavigation();

	return (
		<View style={styles.container}>
			<SvgImage source={} />
		</View>
	);
};
