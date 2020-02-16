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
	const { donations } = state;
	const { getLocation, getActiveDonationsForClient } = actions;
	// const [ hasActiveDonations, setHasActiveDonations ] = useState<boolean>(donations?.length > 0 || false);
	// const [ hasUserLocation, setHasUserLocation ] = useState<boolean>(!!coords);
	const userLocation = useRef<LatLng | null>(null);
	const hasUserLocation = useRef<boolean>(false);
	const userDonations = useRef(null);
	const hasActiveDonations = useRef<boolean>(donations?.length > 0 || false);
	const [ nothing, refresh ] = useState(null);

	// donations && donations !== [] && console.log(Object.entries(donations))
	// console.log(donations)

	const animateTo = ({ latitude, longitude }: LatLng) => {
		if (latitude && longitude) {
			const newCamera = { center: { latitude, longitude }, altitude: 10000, zoom: 14 };
			map?.current?.animateCamera(newCamera, { duration: 1500 });
		}
	};

	const onMapReady = async () => {
		setTimeout(() => {
			// console.log({ hasUserLocation, userLocation })
			hasUserLocation.current && animateTo(userLocation.current);
		}, 1000);
	};

	const getUserLocation = async () => {
		console.log('getting location')
		const { latitude, longitude } = await getLocation();
		userLocation.current = { latitude, longitude };
		// console.log(latitude, longitude)
		// console.log(!!latitude && !!longitude)
		// hasUserLocation.current = !!latitude && !!longitude;
		console.log(hasUserLocation.current)
		refresh(null);
		onMapReady();
	};

	const getActiveDonations = async () => {
		console.log('getting donations')
		if (hasUserLocation.current) {
			// const hasDonations = await getActiveDonationsForClient(userLocation.current);
			userDonations.current = await getActiveDonationsForClient(userLocation.current);
			// hasActiveDonations.current = hasDonations;
			hasActiveDonations.current = !!userDonations.current;
			console.log({ hasActiveDonations, userDonations })
			refresh(null);
		}
	};
	
	useEffect(() => {
		// console.log({ hasUserLocation, hasActiveDonations })
		if (!hasUserLocation.current) {
			getUserLocation();
			return;
		}
		getActiveDonations();
	}, [ nothing ]);

	return (
		<View style={styles.outerContainer}>
				<MapView
					ref={map}
					provider={PROVIDER_DEFAULT}
					loadingEnabled={true}
					loadingBackgroundColor="gray"
					loadingIndicatorColor={colors.BANANA_YELLOW}
					showsUserLocation={true}
					style={styles.mapView}
					rotateEnabled={false}
				>
					{/* { hasActiveDonations && (
						Object.entries(donations).map(donor => (
							<Marker coordinate={donor[0].coords} key={Object.keys(donor)[0]}>
								<MapMarker donor={donor} />
							</Marker>
						)))} */}
				</MapView>
			<View style={styles.header}>
				<Header includeMapNavigation={true} showBackButton={false} />
				<Title text="Donations" />
			</View>
		</View>
	);
};
