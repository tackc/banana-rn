import { LatLng } from 'react-native-maps';

export interface DonorState {
	business_license: string;
	organization_name: string;
}

export interface ClientState {
	claims: Claim[] | [];
	coords?: LatLng;
	hasCoords: boolean;
	lastCoordsCheck: Date;
	hasDonations: boolean;
	lastDonationCheck: Date;
	ethnicity: string;
	gender: string;
}

export interface SharedProps {
	account_status: string;
	address_street: string;
	address_city: string;
	address_state: string;
	address_zip: number;
	donations?: Donation[];
	email: string;
	password: string;
}

export interface Claim {
	canceled: boolean;
	client_id: number;
	completed: boolean;
	created_at: Date;
	donation_id: number;
	qr_code: string;
	time_claimed: Date;
	updated_at: Date;
}

export interface Donation {
	canceled: boolean;
	claims?: Claim[];
	coords: LatLng;
	created_at: Date;
	donor_id: number;
	duration_minutes: number;
	food_name: string;
	image_url: string;
	measurement: string;
	organization_name: string;
	per_person: number;
	pickup_location: string;
	total_servings: number;
	updated_at: Date;
}

export interface Donor {
	address: string;
	donations: Donation[];
	latitude: number;
	longitude: number;
	organization_name: string;
	distance: number;
}

export interface InitialState {
	apiBaseUrl: string;
	claims?: Claim[];
	donations?: Donation[];
	donorAddresses?: string[];
	loginUrl: string;
	jwt?: string;
	mapOrListView?: 'map' | 'list';
	user?: DonorState | ClientState | SharedProps;
	userIdentity: 'donor' | 'client';
}

export interface StatusCode {
	code: 200 | 202 | 400 | 403 | 404 | 406 | 418 | 422 | 500;
}
