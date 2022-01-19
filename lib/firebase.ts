// import 'firebase/firestore';
// import 'firebase/storage';

import { getApps, initializeApp } from 'firebase/app';
import {
	ActionCodeSettings,
	createUserWithEmailAndPassword,
	getAuth,
	sendEmailVerification,
	signInWithEmailAndPassword,
	UserCredential,
} from 'firebase/auth';
import { getErrorMessage, UserNotVerifiedError } from 'utils/errors';

const firebaseConfig = {
	apiKey: 'AIzaSyCcAECDcx5-aBr_d7m5SVaqq1b-EQClriw',
	authDomain: 'swiadomosc-c2e6a.firebaseapp.com',
	projectId: 'swiadomosc-c2e6a',
	storageBucket: 'swiadomosc-c2e6a.appspot.com',
	messagingSenderId: '941175250550',
	appId: '1:941175250550:web:a3824ccf59fb19f4a90957',
	measurementId: 'G-EPNCSL5JJL',
};
if (!getApps().length) initializeApp(firebaseConfig);

export const auth = getAuth();

const getActionCodeSettings = (): ActionCodeSettings => ({
	url: window.location.origin,
});

export const signUp = async (
	email: string,
	password: string,
	handleError: (mess: string) => void
) => {
	let data: UserCredential | null = null;
	try {
		data = await createUserWithEmailAndPassword(auth, email, password);
		await sendEmailVerification(data.user, getActionCodeSettings());
	} catch (e) {
		switch (getErrorMessage(e)) {
			case 'auth/email-already-in-use':
				handleError('Email jest już w użyciu. Zapomniałeś hasła?');
				break;
			case 'auth/network-request-failed':
				handleError('Nie udało się zarejestrować. Spróbuj później.');
				break;
			default:
				throw e;
		}
	}
	if (data === null) throw new Error('Error in sign up');
	return data;
};

export const signIn = async (
	email: string,
	password: string,
	handleError: (mess: string) => void
) => {
	let data: UserCredential | null = null;

	try {
		data = await signInWithEmailAndPassword(auth, email, password);
		if (!data.user.emailVerified) throw new UserNotVerifiedError();
	} catch (e) {
		switch (getErrorMessage(e)) {
			case 'auth/invalid-email':
				handleError('Błędny email.');
				break;
			case 'auth/user-disabled':
				handleError('Twoje konto jest zablokowane.');
				break;
			case 'auth/user-not-found':
			case 'auth/wrong-password':
				handleError('Błędny email bądź hasło');
				break;
			default:
				if (typeof e === 'string') handleError(e);
				else handleError('Coś poszło nie tak. Spróbuj ponownie później.');
		}
	}
	if (data === null) throw new Error('Error in sign in');
	return data;
};
