import { askAsync, LOCATION, PermissionResponse } from 'expo-permissions';
import { enableNetworkProviderAsync, getLastKnownPositionAsync } from 'expo-location';

export const getLocation = async store => {
	await enableNetworkProviderAsync();
	const locationResponse: PermissionResponse = await askAsync(LOCATION);
	if (locationResponse?.granted) {
		try {
			const location = await getLastKnownPositionAsync();
			if (location) {
				const { latitude, longitude } = location?.coords;
				await store.setState({ user: { ...store.state.user, coords: { latitude, longitude } } });
				return { latitude, longitude };
			}
		} catch (error) {
			console.error(error);
		}
	}
	const coords = { latitude: null, longitude: null };
	await store.setState({ user: { ...store.state.user, coords } });
	return coords;
};
