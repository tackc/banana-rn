import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { View, Text, TouchableOpacity } from 'react-native';
import { Donor } from '@state/index.types';
import getTimeLeftInMinutes from '@util/getTimeLeftInMinutes';
import truncateText from '@util/truncateText';
import { SvgImage } from '@elements';
import styles from './MapMarker.styles';

export default ({ donor }: { donor: Donor }) => {
	const markerText = {
		topText: '',
		bottomText: '',
	};

	switch (donor.donations?.length) {
		case 0: return <></>;
		case 1: {
			const { created_at, duration_minutes, food_name } = donor.donations[0];
			const timeLeft = getTimeLeftInMinutes({ created_at, duration_minutes });
			markerText.topText = truncateText(food_name);
			markerText.bottomText = truncateText(`${timeLeft} • ${donor.distance}`);
			break;
		}
		default: {
			markerText.topText = `${donor.donations.length} DONATIONS`;
			markerText.bottomText = donor.organization_name;
		}
	}

	return (
		<TouchableOpacity>
			<View style={styles.container}>
				<View style={styles.iconContainer}>
					<SvgImage source={require('@assets/icons/ICON_LOGO.svg')} style={styles.icon} />
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.topText}>{markerText.topText}</Text>
					<Text style={styles.bottomText}>{markerText.bottomText}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};
