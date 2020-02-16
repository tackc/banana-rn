import { askAsync, LOCATION, PermissionResponse } from 'expo-permissions';
import { enableNetworkProviderAsync, getLastKnownPositionAsync } from 'expo-location';

export const getLocation = async store => {
	await enableNetworkProviderAsync();
	const locationResponse: PermissionResponse = await askAsync(LOCATION);
	if (locationResponse?.granted) {
		try {
			const location = await getLastKnownPositionAsync();
			if (location) {
				const { coords } = location;
				const user = { ...store.state.user, coords };
				// await store.setState({ user });
				return coords;
			}
		} catch (error) {
			console.error(error);
		}
	}
	const coords = { latitude: null, longitude: null };
	const user = { ...store.state.user, coords };
	// await store.setState({ user });
	return coords;
};
