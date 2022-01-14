/* eslint-disable no-fallthrough */
import { FieldError, RegisterOptions } from 'react-hook-form';

type Errors = { [key in FieldError['type']]: string };
const getDefaultInputErr = (key?: keyof Errors, options?: RegisterOptions) => {
	const min = options?.minLength || options?.min;
	const max = options?.maxLength || options?.max;

	switch (key) {
		case 'required':
			return 'To pole jest wymagane';
		case 'min':
			if (min) return `To pole wymaga przynajmniej ${min} znaków`;
		case 'max':
			if (max) return `To pole może zawierać maks ${max} znaków`;
		default:
			return undefined;
	}
};
export default getDefaultInputErr;
