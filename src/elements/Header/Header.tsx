import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, MapNavigationButton } from '@elements';
import HamburgerPopupMenu from '../HamburgerPopupMenu';

import styles from './Header.styles';

interface HeaderProps {
	backButtonText?: string;
	backDestination?: string;
	includeMapNavigation?: boolean;
	showBackButton?: boolean;
	showMenu?: boolean;
}

export default ({
	backButtonText = 'Back',
	backDestination,
	includeMapNavigation = false,
	showBackButton = true,
	showMenu = true,
}: HeaderProps) => {
	const { navigate, goBack } = useNavigation();

	return (
		<View style={styles.contentContainer}>
			<View style={styles.backContainer}>
				{ showBackButton && (
					<TouchableOpacity
						onPress={backDestination ? () => navigate(backDestination) : () => goBack()}
						style={{ flexDirection: 'row', alignItems: 'center' }}
					>
						<Icon name="chevron-left" />
					</TouchableOpacity>
				)}
			</View>

			{ includeMapNavigation && (
				<View style={styles.mapNavigationContainer}>
					<MapNavigationButton title="map" />
					<MapNavigationButton title="list" />
				</View>
			)}

			<View>
				{ showMenu && (
					<HamburgerPopupMenu />
				)}
			</View>
		</View>
	);
};
