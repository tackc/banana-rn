import React from 'react';
import {
	Text,
	View,
} from 'react-native';
import useGlobal from '@state';
import {
	TextButton,
	Modal,
	Icon,
} from '@elements';
import { Alert } from '@state/index.types';
import { useScheme } from '@util/colorSchemes';
import typography from '@util/typography';
import styles from './ClaimDonationModal.styles';

export default () => {
	const [ globalState, globalActions ] = useGlobal() as any;
	const { alert: alertObj }: { alert: Alert } = globalState;
	const { clearAlert } = globalActions;
	const scheme = useScheme();

	const handleCloseButtonPress = () => {
		clearAlert();
	};

	const handleDismiss = () => {
		if (alertObj.dismissable) {
			clearAlert();
		}
	};
	if (!alertObj) return null;
	if (!alertObj.type || alertObj.type === 'default') {
		return (
			<Modal
				style={styles.container}
				title={alertObj?.title || 'Alert'}
				palette="accent"
				open={alertObj !== undefined}
				onDismiss={handleDismiss}
			>
				<View style={styles.body}>
					<View style={styles.textContainer}>
						<Text style={typography.body1}>
							{alertObj?.message || 'Uh oh, an unknown error has occurred!'}
						</Text>
					</View>

					<TextButton
						text="OK"
						style={{
							width: 104,
						}}
						buttonStyle={{
							default: scheme.primary,
							pressed: scheme.secondary,
							disabled: scheme.disabled,
						}}
						onPress={handleCloseButtonPress}
					/>
				</View>
			</Modal>
		);
	}
	if (alertObj.type === 'item claimed') {
		return (
			<Modal
				style={styles.container}
				title={alertObj?.title || 'ITEM CLAIMED'}
				palette="secondary"
				open={alertObj !== undefined}
				onDismiss={handleDismiss}
			>
				<View style={styles.body}>
					<Icon name="bananaMarker" size={75} />
					<View style={{
						padding: 5,
						flexGrow: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}
					>
						<Text style={typography.body1}>
							{alertObj?.message || 'Location: Distance: '}
						</Text>
					</View>

					<TextButton 
						text="OK"
						style={{
							width: 104,
						}}
						buttonStyle={{
							default: scheme.primary,
							pressed: scheme.secondary,
							disabled: scheme.disabled,
						}}
						onPress={handleCloseButtonPress}
					/>
				</View>
			</Modal>
		);
	}
	return null;
};
