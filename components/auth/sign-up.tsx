import { useState } from 'react';
import { signUp } from 'lib/firebase';
import { useForm } from 'react-hook-form';
import { passRegex } from 'utils/globals';
import Button from 'components/user-inputs/button';
import {
	InputCompare,
	checkCompares,
	MergeWithCompare,
} from 'components/user-inputs/input-compare';
import { EmailWIthPassword } from 'types';
import { commonEmailProps, commonPassProps } from 'utils/inputProps';
import { toast } from 'react-toastify';
import Spinner from 'components/spinner';

type AllFields = MergeWithCompare<EmailWIthPassword>;

const SignUp = () => {
	const {
		register,
		setError,
		formState: { errors },
		handleSubmit,
	} = useForm<EmailWIthPassword>();

	const [isRegistered, setIsRegistered] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (data: AllFields) => {
		setIsLoading(true);
		const { email, password } = data;
		if (checkCompares(data, setError)) {
			await signUp(email, password, toast.error);
			setIsLoading(false);
			setIsRegistered(true);
		}
	};
	return !isRegistered ? (
		<form onSubmit={handleSubmit(onSubmit)}>
			{isLoading && <Spinner />}
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
