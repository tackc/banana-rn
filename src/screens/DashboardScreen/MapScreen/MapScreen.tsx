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
import styles from './MapScreen.styles';
import MapMarker from './MapMarker';

export default () => {
	const map = useRef<MapView | null>(null);
	const [ state, actions ] = useGlobal() as any;
	const { user: { coords, hasCoords, hasDonations }, donations } = state;
	const { getLocation, getActiveDonationsForClient } = actions;

	const animateTo = ({ latitude, longitude }: LatLng) => {
		if (latitude && longitude) {
			const newCamera = { center: { latitude, longitude }, altitude: 10000, zoom: 14 };
			map?.current?.animateCamera(newCamera, { duration: 1500 });
		}
	};

	const onMapReady = () => {
		setTimeout(() => {
			animateTo(coords);
		}, 1000);
	};

	useEffect(() => {
		hasCoords
			? getActiveDonationsForClient()
			: getLocation();
	}, []);

	return (
		<View style={styles.outerContainer}>
			{/* { hasUserLocation && ( */}
				<MapView
					ref={map}
					provider={PROVIDER_DEFAULT}
					onMapReady={onMapReady}
					loadingEnabled={true}
					showsUserLocation={true}
					style={styles.mapView}
					rotateEnabled={false}
				>
					{ hasDonations && donations?.length && (
						donations.map(donor => (
							<Marker coordinate={donor[1].coords} key={donor[0]}>
								<MapMarker donor={donor} />
							</Marker>
						)))}
				</MapView>
			{/* )} */}
			<View style={styles.header}>
				<Header includeMapNavigation={true} showBackButton={false} />
				<Title text="Donations" />
			</View>
		</View>
	);
};
