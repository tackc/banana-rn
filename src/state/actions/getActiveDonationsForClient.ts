import railsAxios from '@util/railsAxios';

export const getActiveDonationsForClient = async store => {
	console.log('getActiveDonations')
	const { jwt, user: { id, coords: { latitude, longitude } } } = store.state;
	if (!latitude || !longitude) {
		console.error('Need location to get donations for client');
		return null;
	}
	const endpoint = `/clients/${id}/get_donations`;
	const location = JSON.stringify({ client_lat: latitude, client_long: longitude });
	console.log('location in getActiveDonations:', location)
	if (latitude && longitude) {
		try {
			const response = await railsAxios(jwt).post(endpoint, location);
			const { data } = response;
			const sortedData = data.sort((a, b) => a.created_at < b.created_at);
			if (sortedData) {
				await store.setState({ donations: sortedData });
				console.log({sortedData})
				return sortedData;
			}
		} catch (error) {
			console.log(error);
		}
	}
	await store.setState({ donationsOrClaims: [] });
	return [];
};
