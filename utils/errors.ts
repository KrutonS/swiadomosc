import { FirebaseError } from 'firebase/app';
import { toast } from 'react-toastify';

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

export const handleDefaultError = (e: unknown, handler = toast.error) => {
	let message =
		'Coś poszło nie tak. Skontaktuj się z nami i zgłoś błąd lub spróbuj ponownie później.';
	if (typeof e === 'string') message += e;
	else if (e instanceof FirebaseError) message += e.code;
	else if (e instanceof Error) message += e.message;
	handler(message);
	return message;
};
