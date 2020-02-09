import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { View, Text, ActivityIndicator } from 'react-native';
import * as colors from '@util/colors';
import styles from './LinkButton.styles';

interface LinkButtonProps {
	destination?: string;
	onPress?: (any) => void;
	hasPendingAction?: boolean;
	text: string;
}

export default ({
	text, destination, onPress, hasPendingAction,
}: LinkButtonProps) => {
	const { navigate } = useNavigation();
	const buttonFunction = destination
		? () => navigate(destination)
		: onPress && (func => onPress(func));

	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text
					style={styles.text}
					onPress={hasPendingAction ? undefined : buttonFunction}
				>
					{text.toUpperCase()}
				</Text>
			</View>
			{ hasPendingAction && (
				<View style={styles.activityIndicatorContainer}>
					<ActivityIndicator size="large" color={colors.LIGHT_GRAY_DISABLED} />
				</View>
			)}
		</View>
	);
};
