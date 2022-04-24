import {
	ActionCodeSettings,
	UserCredential,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from 'lib/firebase';
import { EmailWIthPassword } from 'types';
import { UserNotVerifiedError } from 'utils/errors';

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
