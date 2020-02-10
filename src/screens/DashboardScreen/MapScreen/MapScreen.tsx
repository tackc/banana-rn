import React, { useRef, useState, useEffect } from 'react';
import {
	View,
} from 'react-native';
import MapView, { PROVIDER_DEFAULT, Marker, LatLng } from 'react-native-maps';
import useGlobal from '@state';
import { Donation } from '@state/index.types';
import {
	Header,
	Title,
} from '@elements';
import * as colors from '@util/colors';
import styles from './MapScreen.styles';
import MapMarker from './MapMarker';

export default () => {
	const map = useRef<MapView | null>(null);
	const [ state, actions ] = useGlobal() as any;
	const { user: { coords }, donations } = state;
	const [ hasActiveDonations, setHasActiveDonations ] = useState<boolean>(donations.length > 0);
	const [ hasUserLocation, setHasUserLocation ] = useState<boolean>(!!coords);
	const { getLocation, getActiveDonationsForClient } = actions;

	const animateTo = ({ latitude, longitude }: LatLng) => {
		if (latitude && longitude) {
			const newCamera = { center: { latitude, longitude }, altitude: 10000, zoom: 14 };
			map?.current?.animateCamera(newCamera, { duration: 1500 });
		}
	};

	const onMapReady = async () => {
		setTimeout(() => {
			animateTo(coords);
		}, 1000);
	};

	const getUserLocation = async () => {
		const { latitude, longitude } = await getLocation();
		await setHasUserLocation(!!latitude && !!longitude);
	};

	const getActiveDonations = async () => {
		const hasDonations = await getActiveDonationsForClient();
		await setHasActiveDonations(hasDonations);
	};

	useEffect(() => {
		if (!hasUserLocation) {
			getUserLocation();
		}
		if (!hasActiveDonations) {
			getActiveDonations();
		}
	}, []);

	return (
		<View style={styles.outerContainer}>
			{ hasUserLocation && (
				<MapView
					ref={map}
					provider={PROVIDER_DEFAULT}
					onMapReady={onMapReady}
					loadingEnabled={true}
					loadingBackgroundColor="gray"
					loadingIndicatorColor={colors.BANANA_YELLOW}
					showsUserLocation={true}
					style={styles.mapView}
					rotateEnabled={false}
				>
					{ hasActiveDonations && (
						Object.entries(donations).map(donor => (
							<Marker coordinate={donor[0].coords} key={Object.keys(donor)[0]}>
								<MapMarker donor={donor} />
							</Marker>
						)))}
				</MapView>
			)}
			<View style={styles.header}>
				<Header includeMapNavigation={true} showBackButton={false} />
				<Title text="Donations" />
			</View>
		</View>
	);
};
