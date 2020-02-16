import Constants from 'expo-constants';

const DONOR = {
	LOGIN_URL: '/donor_auth',
};

const CLIENT = {
	LOGIN_URL: '/client_auth',
	MAP_OR_LIST_VIEW: 'map',
};

const getEnv = () => {
	const { variant } = Constants.manifest.extra;
	const variantSpecificProperties = variant === 'donor'
		? DONOR
		: CLIENT;
	return ({
		...variantSpecificProperties,
		USER_IDENTITY: variant,
		API_BASE_URL: 'http://localhost:3000',
		// API_BASE_URL: 'http://10.0.2.2:3000',
		// API_BASE_URL: 'https://banana-rails.herokuapp.com',
	});
};

export default getEnv;
