import { askAsync, LOCATION, PermissionStatus } from 'expo-permissions';
import { getCurrentPositionAsync } from 'expo-location';

export const getLocation = async store => {
	const { status }: { status: PermissionStatus } = await askAsync(LOCATION);
	if (status === 'granted') {
		const { coords } = await getCurrentPositionAsync({});
		await store.setState({ coords });
		return coords;
	}
	const coords = { latitude: null, longitude: null };
	await store.setState({ coords });
	return coords;
};
