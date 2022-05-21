/* eslint-disable max-classes-per-file */
import { FirebaseError } from 'firebase/app';
import { FieldValues } from 'react-hook-form';
import { EmailWIthPassword } from 'types';

export type FirebaseErrors =
	| 'auth/email-already-in-use'
	| 'auth/network-request-failed'
	| 'auth/invalid-email'
	| 'auth/user-disabled'
	| 'auth/user-not-found'
	| 'auth/wrong-password'
	| 'auth/invalid-user-token';

export type CustomFormErrors = 'user-not-verified' | 'fields-not-equal';

export type AppErrorKeys = FirebaseErrors | CustomFormErrors;

export const defaultErrors: { [k in AppErrorKeys]: string } = {
	'auth/email-already-in-use': 'Email jest już w użyciu. Zapomniałeś hasła?',
	'auth/network-request-failed': 'Brak połączenia, spróbuj ponownie później',
	'auth/invalid-email': 'Nieprawidłowy email.',
	'auth/user-disabled': 'Twoje konto jest zablokowane.',
	'auth/user-not-found': 'Błędny email bądź hasło',
	'auth/wrong-password': 'Błędny email bądź hasło',
	'auth/invalid-user-token': 'Użytkownik nie jest zalogowany!',
	'user-not-verified':
		'Twoje konto nie zostało jeszcze przez Ciebie aktywowane. Sprawdź swoją skrzynkę pocztową',
	'fields-not-equal': 'Pola nie są takie same!',
};
const defaultError =
	'Coś poszło nie tak. Skontaktuj się z nami i zgłoś błąd lub spróbuj ponownie później.';

export class AppError extends FirebaseError {
	constructor(key: AppErrorKeys, customMessage?: string) {
		super(key, customMessage ?? defaultErrors[key]);
	}
}
export class FormError<T extends FieldValues> extends AppError {
	field?: Extract<keyof T, string>;

	constructor(code: AppErrorKeys, field?: Extract<keyof T, string>) {
		super(code, defaultErrors[code] || defaultError);
		this.field = field;
	}
}

export class UserNotVerifiedError extends FormError<EmailWIthPassword> {
	constructor() {
		super('user-not-verified');
	}
}

export class FieldsNotTheSameError<T extends FieldValues> extends FormError<T> {
	constructor(field: Extract<keyof T, string>) {
		super('fields-not-equal', field);
	}
}

export function getErrorMessage(e: unknown, strict = true): string {
	if (e instanceof FirebaseError)
		return defaultErrors[e.code as FirebaseErrors] || e.code;
	if (e instanceof AppError) return e.message;
	if (!strict) {
		if (e instanceof Error) return e.message;
		if (typeof e === 'string') return e;
		return 'Unknown error';
	}
	throw e;
}

export const getDefaultError = (e: unknown): string => {
	let message = defaultError;
	if (typeof e === 'string') message += e;
	else if (e instanceof FirebaseError) message += e.code;
	else if (e instanceof Error) message += e.message;
	return message;
};

export class ApiError extends Error {
	status: number;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;
	}

	toString() {
		return `[${this.status}] ${this.message}`;
	}
}
