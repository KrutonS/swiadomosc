// import 'firebase/firestore';
// import 'firebase/storage';

import { getApps, initializeApp } from 'firebase/app';
import {
	ActionCodeSettings,
	createUserWithEmailAndPassword,
	getAuth,
	sendEmailVerification,
} from 'firebase/auth';

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
	// 	handleCodeInApp: true,
});

export const signUp = async (email: string, password: string) => {
	const data = await createUserWithEmailAndPassword(auth, email, password);
	return sendEmailVerification(data.user, getActionCodeSettings());
};
