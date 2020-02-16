import railsAxios from '@util/railsAxios';
import timeDiff from '@util/timeDiffInSeconds';

export const getActiveDonationsForClient = async store => {
	const {
		jwt, user: {
			id, hasCoords, lastDonationCheck, coords: { latitude, longitude },
		},
	} = store.state;
	if (!hasCoords) {
		console.log('Need location to get donations for client');
		return false;
	}
	
	// only do a donation check if we haven't done one in the last 5 minutes
	if (lastDonationCheck && timeDiff(lastDonationCheck) < (5 * 60)) { return false; }
	// console.log(lastDonationCheck && timeDiff(lastDonationCheck))

	const endpoint = `/clients/${id}/get_donations`;
	const location = JSON.stringify({ client_lat: latitude, client_long: longitude });
	try {
		const { data } = await railsAxios(jwt).post(endpoint, location);
		if (data) {
			await store.setState({
				donations: Object.entries(data),
				user: {
					...store.state.user,
					hasDonations: true,
					lastDonationCheck: new Date(),
				},
			});
			return true;
		}
	} catch (error) {
		console.log(error);
		await store.setState({
			donations: [],
			user: {
				...store.state.user,
				hasDonations: false,
				lastDonationCheck: new Date(),
			},
		});
	}
	return false;
};
