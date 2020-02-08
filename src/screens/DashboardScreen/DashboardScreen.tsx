import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useGlobal from '@state';
import { Title, SpacerInline, Header } from '@elements';
import DonationsOrClaims from './DonationsOrClaims';
import styles from './DashboardScreen.styles';
import MapScreen from './MapScreen/MapScreen';

const DashboardScreen = () => {
	const { navigate } = useNavigation();
	const [ state ] = useGlobal();
	const { userIdentity, mapOrListView } = state;
	const title = userIdentity === 'donor' ? 'My Donations.' : 'Open Donations.';

	const DashboardContentChooser = () => {
		if (userIdentity === 'donor') { return <DonationsOrClaims resource="donations" />; }
		if (mapOrListView === 'map') { return <MapScreen />; }
		return <DonationsOrClaims resource="donations" />;
	};

	return (
		<View style={styles.outerContainer}>
			<View>
				<Header showBackButton={false} includeMapNavigation={userIdentity === 'client'} />
				<Title text={title} />
				<SpacerInline height={20} />
			</View>

			<DashboardContentChooser />

			{ userIdentity === 'donor' && (
				<View style={styles.addButton}>
					<TouchableOpacity
						onPress={() => navigate('DonationScreen', {})}
					>
						<View>
							<Text style={styles.plus}>
								+
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export default DashboardScreen;
