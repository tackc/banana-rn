import React, { useState } from 'react';
import {
	View,
	TextInput,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import styles from './QRCodeScreen.styles';

export default ({ QRString }: { QRString?: string }) => {
	const [ text, setText ] = useState(QRString || 'Food Donation');
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				onChangeText={setText}
				value={text}
			/>
			<QRCode
				value={text}
				size={200}
			/>
		</View>
	);
};
