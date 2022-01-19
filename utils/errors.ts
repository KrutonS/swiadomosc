import { FirebaseError } from 'firebase/app';

export class UserNotVerifiedError extends Error {
	constructor() {
		super(
			'Twoje konto nie zostało jeszcze przez Ciebie zweryfikowane. Sprawdź swoja skrzynkę pocztową'
		);
	}
}
export function getErrorMessage(e: unknown): string | unknown {
	if (typeof e === 'string') return e;
	if (e instanceof FirebaseError) return e.code;
	if (e instanceof Error) return e.message;
	// throw e;
	return e;
}
