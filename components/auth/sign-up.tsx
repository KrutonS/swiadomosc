import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { passRegex } from 'utils/globals';
import Button from 'components/user-inputs/button';
import {
	InputCompare,
	checkCompares,
} from 'components/user-inputs/input-compare';
import { EmailWIthPassword } from 'types';
import { commonEmailProps, commonPassProps } from 'utils/inputProps';
import Spinner from 'components/spinner';
import { useFormError } from 'utils/hooks/errors';
import { useAsync } from 'utils/hooks/async';
import { signUp } from 'utils/firebase/auth';

const SignUp = () => {
	const {
		register,
		setError,
		formState: { errors },
		handleSubmit,
		control,
	} = useForm<EmailWIthPassword>();

	const [isDone, setIsDone] = useState(false);
	// const [isLoading, setIsLoading] = useState(false);

	const { generalError, errorHandler } = useFormError(
		setError,
		{
			'auth/email-already-in-use': 'email',
			'auth/invalid-email': 'email',
			'auth/user-not-found': 'email',
		},
		control
	);
	// const onSuccess = () => setIsDone(true);

	const { handler: onSubmit, loading } = useAsync(
		(data: EmailWIthPassword) => {
			checkCompares(data);
			const { email, password } = data;
			return signUp(email, password);
		},
		() => setIsDone(true),
		errorHandler
	);

	return !isDone ? (
		<form onSubmit={handleSubmit(data => onSubmit(data))}>
			{loading && <Spinner />}
			<InputCompare {...commonEmailProps} register={register} errors={errors} />
			<InputCompare
				{...commonPassProps}
				register={register}
				options={{
					minLength: {
						value: 8,
						message: 'Hasło jest za krótkie! Minimalna długość to 8 znaków.',
					},
					pattern: {
						value: passRegex,
						message:
							'Hasło musi zawierać przynajmniej jedną dużą literę, małą literę, cyfrę i znak specjalny!',
					},
				}}
				errors={errors}
			/>
			<p className="error">{generalError}</p>
			<Button type="submit">Zarejestruj się</Button>
		</form>
	) : (
		<p>
			Rejestracja zakończona. Na twój email została wysłana wiadomość z linkiem
			aktywacyjnym konta :)
		</p>
	);
};

export default SignUp;
