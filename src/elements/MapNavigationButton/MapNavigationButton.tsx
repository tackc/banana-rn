import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import useGlobal from '@state';
import titleCase from '@util/titleCase';
import stylesFactory from './MapNavigationButton.styles';

interface MapNavButtonProps {
	title: 'map' | 'list';
}

export default ({ title }: MapNavButtonProps) => {
	const [ state, actions ] = useGlobal() as any;
	const { mapOrListView } = state;
	const { setMapOrListView } = actions;
	const styles = stylesFactory(title === mapOrListView);

	return (
		<TouchableWithoutFeedback
			onPress={() => setMapOrListView(title)}
		>
			<View style={styles.container}>
				<View>
					<Text style={styles.text}>
						{titleCase(title)}
					</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};
