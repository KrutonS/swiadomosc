import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

export const app = getApp();
export const auth = getAuth(app);

export const db = getFirestore();
