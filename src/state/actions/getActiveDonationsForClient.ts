import railsAxios from '@util/railsAxios';

export const getActiveDonationsForClient = async (store, coords) => {
	console.log('get active donations for client')
	const { jwt, user: { id } } = store.state;
	if (!coords) {
		console.error('Need location to get donations for client');
		return null;
	}
	const { latitude, longitude } = coords;
	const endpoint = `/clients/${id}/get_donations`;
	const location = JSON.stringify({ client_lat: latitude, client_long: longitude });
	// finish consuming new donations hash by address
	try {
		const { data } = await railsAxios(jwt).post(endpoint, location);
		if (data) {
			await store.setState({ donations: data.donations });
			return data?.donations;
		}
	} catch (error) {
		console.log(error);
	}
	await store.setState({ donationsOrClaims: [] });
	return null;
};
