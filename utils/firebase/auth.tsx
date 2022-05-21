import {
	ActionCodeSettings,
	UserCredential,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { auth } from 'lib/firebase';
import { EmailPasswordAndName, EmailWIthPassword } from 'types';
import { UserNotVerifiedError } from 'utils/errors';

const getActionCodeSettings = (): ActionCodeSettings => ({
	url: window.location.origin,
});

export const signUp = async ({
	displayName,
	email,
	password,
}: EmailPasswordAndName) => {
	const data = await createUserWithEmailAndPassword(auth, email, password);
	Promise.all([
		sendEmailVerification(data.user, getActionCodeSettings()),
		updateProfile(data.user, { displayName }),
	]);
	return data;
};

export const signIn = async ({ email, password }: EmailWIthPassword) => {
	let data: UserCredential | null = null;
	data = await signInWithEmailAndPassword(auth, email, password);
	if (data && !data.user.emailVerified) throw new UserNotVerifiedError();
	return data;
};
