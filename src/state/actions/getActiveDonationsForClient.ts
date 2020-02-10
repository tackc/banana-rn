import railsAxios from '@util/railsAxios';

export const getActiveDonationsForClient = async store => {
	const { jwt, user: { id, coords: { latitude, longitude } } } = store.state;
	if (!latitude || !longitude) {
		console.error('Need location to get donations for client');
		return null;
	}
	const endpoint = `/clients/${id}/get_donations`;
	const location = JSON.stringify({ client_lat: latitude, client_long: longitude });
	// finish consuming new donations hash by address
	if (latitude && longitude) {
		try {
			const { data } = await railsAxios(jwt).post(endpoint, location);
			if (data) {
				await store.setState({ donations: data.donations });
				return true;
			}
		} catch (error) {
			console.log(error);
		}
	}
	await store.setState({ donationsOrClaims: [] });
	return false;
};
