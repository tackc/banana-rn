import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { View, Text, TouchableOpacity } from 'react-native';
import { Donation } from '@state/index.types';
import { SvgImage } from '@elements';
import styles from './MapMarker.styles';

export default ({
	created_at,
	distance,
	duration_minutes,
	food_name,
	organization_name,
}: Donation) => {
	const startTime = new Date(created_at);
	const now = new Date();
	const minutesElapsed = Math.round((now.getTime() - startTime.getTime()) / 1000 / 60);
	const timeLeft = minutesElapsed < duration_minutes
		? duration_minutes - minutesElapsed
		: 0;

	const truncateText = text => {
		const maxCharacters = 10;
		return text ? `${text.slice(0, maxCharacters)}${text.length > maxCharacters ? '...' : ''}` : '?';
	};

	return (
		<TouchableOpacity>
			<View style={styles.container}>
				<View style={styles.iconContainer}>
					<SvgImage source={require('@assets/icons/ICON_LOGO.svg')} style={styles.icon} />
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.foodNameText}>{truncateText(organization_name)}</Text>
					<Text style={styles.foodNameText}>{truncateText(food_name)}</Text>
					<Text style={styles.donationInfoText}>{truncateText(`${timeLeft} • ${distance}`)}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};
