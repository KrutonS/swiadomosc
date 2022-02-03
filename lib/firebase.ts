import { getApp, getApps, initializeApp } from 'firebase/app';
import {
	ActionCodeSettings,
	createUserWithEmailAndPassword,
	getAuth,
	sendEmailVerification,
	signInWithEmailAndPassword,
	UserCredential,
} from 'firebase/auth';
import { EmailWIthPassword } from 'types';

import { UserNotVerifiedError } from 'utils/errors';

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

export const auth = getAuth(getApp());

const getActionCodeSettings = (): ActionCodeSettings => ({
	url: window.location.origin,
});

export const signUp = async (email: string, password: string) => {
	let data: UserCredential | null = null;
	data = await createUserWithEmailAndPassword(auth, email, password);
	await sendEmailVerification(data.user, getActionCodeSettings());
	return data;
};

export const signIn = async ({ email, password }: EmailWIthPassword) => {
	let data: UserCredential | null = null;
	data = await signInWithEmailAndPassword(auth, email, password);
	if (data && !data.user.emailVerified) throw new UserNotVerifiedError();
	return data;
};
