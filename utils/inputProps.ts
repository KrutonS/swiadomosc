// import { InputProps } from 'components/user-inputs/input';
// import { FieldValues } from 'react-hook-form';
import { emailRegex } from './globals';

export const commonEmailProps =
	// :Partial<InputProps<FieldValues>>
	{
		type: 'email',
		label: 'Email',
		id: 'email' as const,
		options: {
			pattern: { value: emailRegex, message: 'Niepoprawny email!' },
		} as const,
		required: true,
		autoComplete: 'email',
	};

export const commonPassProps =
	// :Partial<InputProps<FieldValues>>
	{
		label: 'Hasło',
		type: 'password',
		id: 'password' as const,
		required: true,
		autoComplete: 'current-password',
	};
