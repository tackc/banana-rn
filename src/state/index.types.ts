import { LatLng } from 'react-native-maps';

export interface DonorState {
	organization_name: string;
	business_license: string;
}

export interface ClientState {
	transportation_method: string;
	coords: LatLng;
	ethnicity: string;
	gender: string;
	claims?: Claim[];
}

export interface SharedProps {
	email: string;
	password: string;
	address_street: string;
	address_city: string;
	address_state: string;
	address_zip: number;
	account_status: string;
	donations?: Donation[];
}

export interface Claim {
	client_id: number;
	donation_id: number;
	qr_code: string;
	completed: boolean;
	created_at: Date;
	updated_at: Date;
	time_claimed: Date;
	canceled: boolean;
}

export interface Donation {
	canceled: boolean;
	claims?: Claim[];
	coords: LatLng;
	created_at: Date;
	distance: number;
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

export interface InitialState {
	userIdentity: 'donor' | 'client';
	apiBaseUrl: string;
	loginUrl: string;
	jwt?: string;
	user?: DonorState | ClientState | SharedProps;
	donations?: Donation[];
	claims?: Claim[];
	mapOrListView?: 'map' | 'list';
}

export interface StatusCode {
	code: 200 | 202 | 400 | 403 | 404 | 406 | 418 | 422 | 500;
}
