import React from 'react';
import { View } from 'react-native';
import useGlobal from '@state';
import { Title, SpacerInline, Header } from '@elements';
import DonationsOrClaims from './DonationsOrClaims';
import styles from './DashboardScreen.styles';
import MapScreen from './MapScreen/MapScreen';

const DashboardScreen = () => {
	const [ state ] = useGlobal();
	const { userIdentity, mapOrListView } = state;

	const DashboardContentChooser = () => {
		if (userIdentity === 'donor') { return <DonationsOrClaims resource="donations" />; }
		if (mapOrListView === 'map') { return <MapScreen />; }
		return <DonationsOrClaims resource="donations" />;
	};

	return (
		<View style={styles.outerContainer}>
			<DashboardContentChooser />
		</View>
	);
};

export default DashboardScreen;
