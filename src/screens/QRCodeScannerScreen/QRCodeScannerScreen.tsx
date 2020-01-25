import React, { useState, useEffect } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { Text, View, StyleSheet, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import useGlobal from '@state';
import BarCodeMask from './BarCodeMask';
import styles from './QRCodeScannerScreen.styles';

export default () => {
	const [ _state, actions ] = useGlobal() as any;
	const { goBack } = useNavigation();
	const [ hasCameraPermission, setHasCameraPermission ] = useState(false);

	const getPermissions = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		setHasCameraPermission(status === 'granted');
	};

	const handleBarCodeScanned = async barcode => {
		const status = await actions.scan(barcode);
		switch (status) {
			case 202: Alert.alert('Claim completed!'); goBack(); return;
			case 400: Alert.alert('Claim not found - please try again'); return;
			default: Alert.alert('Something went wrong - please try again');
		}
	};

	const ScannerContent = () => {
		switch (hasCameraPermission) {
			case true: return (
				<>
					<BarCodeScanner
						onBarCodeScanned={handleBarCodeScanned}
						style={StyleSheet.absoluteFillObject}
					/>
					<BarCodeMask />
				</>
			);
			case false: return <Text>No access to camera</Text>;
			default: return <Text>Requesting permission to access camera</Text>;
		}
	};

	useEffect(() => {
		getPermissions();
	}, []);

	return (
		<View style={styles.container}>
			<ScannerContent />
		</View>
	);
};
