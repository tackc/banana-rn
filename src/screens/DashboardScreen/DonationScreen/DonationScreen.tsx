import React, { useState } from 'react';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	Alert,
	Picker,
	ScrollView,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Switch } from 'react-native-paper';
import useGlobal from '@state';
import {
	Header,
	SpacerInline,
	FormTextInput,
	LinkButton,
	InputLabel,
} from '@elements';
import * as colors from '@util/colors';
import styles from './DonationScreen.styles';

export default () => {
	const [ state, actions ] = useGlobal() as any;
	const { user, jwt } = state;
	const { postDonation, logOut, getDonationsOrClaims } = actions;
	const { navigate } = useNavigation();
	const donation = useNavigationParam('donation');
	const edit = useNavigationParam('edit');
	const donationId = useNavigationParam('id') || null;

	const {
		amount_per_serving = '',
		claims = '',
		created_at = new Date(),
		duration_minutes = 60,
		food_name = '',
		food_category = '',
		image_url = '',
		pickup_location = state.user.pickup_location || '',
		pickup_instructions = state.user.pickup_instructions || '',
		price_per_serving = '',
		total_servings = '',
	} = donation || {};

	const [ name, setName ] = useState(food_name);
	const [ category, setCategory ] = useState(food_category);
	const [ durationInMinutes, setDurationInMinutes ] = useState(60);
	const [ amountPerServing, setAmountPerServing ] = useState(amount_per_serving);
	const [ totalServings, setTotalServings ] = useState(total_servings);
	const [ pricePerServing, setPricePerServing ] = useState(price_per_serving);
	const [ pickupLocation, setPickupLocation ] = useState(pickup_location);
	const [ pickupInstructions, setPickupInstructions ] = useState(pickup_instructions);

	const [ cancel, setCancel ] = useState(false);
	const [ stop, setStop ] = useState(false);

	const icon = require('@assets/images/banana-icon.png');

	const bread = "bread";

	const submitDonation = async () => {
		if (!name) { Alert.alert('Please add the name of your donation.'); return; }
		if (/[^a-z\s]/i.test(name)) { Alert.alert('Please enter a donation name with letters only.'); return; }
		if (!amountPerServing || perPerson < 0) { Alert.alert('Please add an amount (at least one) per person.'); return; }
		if (!totalServings || totalServings < 0) { Alert.alert('Please add at least one total serving.'); return; }
		if (!pricePerServing || pricePerServing < 0) { Alert.alert('Please add a positive dollar amount.'); return; }
		if (!pickupLocation) { Alert.alert('Please enter a pickup location.'); return; }
		if (!pickupInstructions) { Alert.alert('Please enter pickup instructions.'); return; }

		const donationProps = {
			donationId, donorId: user.id, jwt, name, category, durationInMinutes, amountPerServing, totalServings, pricePerServing,
			pickupLocation, pickupInstructions, cancel,
		};
		if (!donationId) { delete donationProps.donationId; }
		const statusCode = await postDonation(donationProps);
		switch (statusCode) {
			case 201: Alert.alert('Donation created!'); getDonationsOrClaims(); navigate('LoginSuccessScreen'); return;
			case 202: Alert.alert('Donation updated!'); getDonationsOrClaims(); navigate('LoginSuccessScreen'); return;
			case (400 || 406): Alert.alert('Bad data - sorry, please try again!'); return;
			case (401 || 403): Alert.alert('Authentication error - please log in again.'); logOut(); navigate('LoginScreen'); return;
			case 404: Alert.alert('Network error - sorry, please try again!'); return;
			case 500: Alert.alert('Server problem - sorry, please try again!'); return;
			default: Alert.alert('Sorry, something went wrong. Please try again.');
		}
	};

	const toggleCancel = () => {
		setCancel(!cancel); setStop(false);
	};
	const toggleStop = () => {
		setStop(!stop); setCancel(false);
	};

	return (
		<ScrollView>
		<View style={styles.outerContainer}>
			<View>
				<Header showMenu={false} />
				<SpacerInline height={20} />

				<View style={styles.iconContainer}>
					<Image source={icon} style={styles.icon} />
				</View>

				<SpacerInline height={40} />
				<View>
					<FormTextInput
						text="Donating:"
						value={name}
						setValue={setName}
					/>
					<InputLabel text="Category" />
					<ModalDropdown options={['option 1', 'option 2']}/>
					<InputLabel text="Time limit" />
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<TouchableOpacity
							onPress={() => setDurationInMinutes(30)}
							style={{
								...styles.timeLimitButton,
								borderColor: durationInMinutes === 30 ? 'white' : colors.BANANA_YELLOW,
							}}
						>
							<Text style={styles.buttonText}>30 MIN</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => setDurationInMinutes(60)}
							style={{
								...styles.timeLimitButton,
								borderColor: durationInMinutes === 60 ? 'white' : colors.BANANA_YELLOW,
							}}
						>
							<Text style={styles.buttonText}>60 MIN</Text>
						</TouchableOpacity>
					</View>
					<SpacerInline height={20} />

					<FormTextInput
						text="Item amount per serving"
						value={amountPerServing && amountPerServing.toString()}
						setValue={setAmountPerServing}
					/>

					<FormTextInput
						text="Total servings"
						value={totalServings && totalServings.toString()}
						setValue={setTotalServings}
					/>

					<FormTextInput
						text="Price per serving"
						value={pricePerServing && pricePerServing.toString()}
						setValue={setPricePerServing}
					/>

					<FormTextInput
						text="Pickup Address"
						value={pickupLocation}
						setValue={setPickupLocation}
					/>

					<FormTextInput
						text="Pickup instructions"
						value={pickupInstructions}
						setValue={setPickupInstructions}
					/>
				</View>
			</View>

			{ edit && (
				<>
					<View style={{ flexDirection: 'column' }}>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
							<InputLabel text="Cancel donation?" />
							<Switch value={cancel} onValueChange={toggleCancel} color={colors.NAVY_BLUE} />
						</View>
						<Text style={styles.infoText}>Any outstanding claims will also be canceled.</Text>
					</View>

					<View>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
							<InputLabel text="Stop donation?" />
							<Switch value={stop} onValueChange={toggleStop} color={colors.NAVY_BLUE} />
						</View>
						<Text style={styles.infoText}>Existing claims will still be fulfilled, but the donation will become inactive.</Text>
					</View>
				</>
			)}

			<View style={styles.createContainer}>
				{
					edit
						? (
							<LinkButton
								text="Save Changes"
								onPress={submitDonation}
							/>
						)
						: (
							<LinkButton
								text="Create"
								onPress={submitDonation}
							/>
						)
				}

				<SpacerInline height={40} />
			</View>
		</View>
		</ScrollView>
	);
};
