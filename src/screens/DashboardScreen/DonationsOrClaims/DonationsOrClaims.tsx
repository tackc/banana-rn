import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from 'react-navigation-hooks';
import {
	ScrollView,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';
import { Divider } from 'react-native-paper';
import useGlobal from '@state';
import { SpacerInline } from '@elements';
import DonationOrClaim from './DonationOrClaim';
import styles from './DonationsOrClaims.styles';

interface LocalProps {
	resource: 'donations' | 'claims';
}

export default ({ resource }: LocalProps) => {
	const { navigate } = useNavigation();
	const isFocused = useIsFocused();
	const [ state, actions ] = useGlobal() as any;
	const { userIdentity } = state;

	const [ donationsOrClaims, setDonationsOrClaims ] = useState(state.donationsOrClaims);
	const [ loaded, setLoaded ] = useState(false);

	const getDonationsOrClaimsFromApi = async () => {
		const { getDonationsOrClaims, getActiveDonationsForClient, getLocation } = actions;
		// const coords = await getLocation();
		const method = userIdentity === 'client' && resource === 'donations' ? getActiveDonationsForClient : getDonationsOrClaims;
		const data = await method(resource);
		if (data) {
			await setDonationsOrClaims(data);
			setLoaded(true);
		}
	};

	useEffect(() => {
		if (isFocused) {
			getDonationsOrClaimsFromApi();
		}
	}, [ isFocused ]);

	if (!loaded) { return <Text>Loading...</Text>; }

	return donationsOrClaims && Array.isArray(donationsOrClaims) && donationsOrClaims !== []
		? (
			<ScrollView>
				{
					(donationsOrClaims as any).map((donationOrClaim, i) => (
						<View key={donationOrClaim.id}>
							<Divider style={{ backgroundColor: 'blue' }} />
							<DonationOrClaim
								donationOrClaim={donationOrClaim}
								key={donationOrClaim.id}
								resource={resource}
							/>
							{
								i === (donationsOrClaims as any).length - 1
									&& <Divider style={{ backgroundColor: 'blue' }} />
							}
						</View>
					))
				}
				<SpacerInline height={200} />
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
			</ScrollView>
		)
		: (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View>
					<Text>No donations to display</Text>
				</View>
			</View>
		);
};
