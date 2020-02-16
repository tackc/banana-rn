import { askAsync, LOCATION, PermissionResponse } from 'expo-permissions';
import { enableNetworkProviderAsync, getLastKnownPositionAsync } from 'expo-location';
import timeDiff from '@util/timeDiffInSeconds';

export const getLocation = async store => {
	await enableNetworkProviderAsync();
	const locationResponse: PermissionResponse = await askAsync(LOCATION);
	const { user: { lastLocationCheck, coords } } = store.state;
	// if we've checked location in the last 5 minutes, don't check again
	if (lastLocationCheck && timeDiff(lastLocationCheck) < 5 * 60) { return; }

	if (locationResponse?.granted) {
		try {
			const location = await getLastKnownPositionAsync();
			if (location) {
				const { latitude, longitude } = location.coords;
				await store.setState({
					user: {
						...store.state.user,
						coords: { latitude, longitude },
						hasCoords: true,
						lastLocationCheck: new Date(),
					},
				});
				return { latitude, longitude };
			}
		} catch (error) {
			console.error(error);
		}
	}
	const newCoords = { latitude: null, longitude: null };
	await store.setState({ user: { ...store.state.user, coords: newCoords } });
	return coords;
};
