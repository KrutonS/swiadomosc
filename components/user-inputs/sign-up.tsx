import { useState } from 'react';
import { signUp } from 'lib/firebase';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { emailRegex, passRegex } from 'utils/globals';
import Button from 'components/user-inputs/button';
import InputCompare, { checkCompares, MergeWithCompare } from './input-compare';

type Fields = { email: string; password: string };
type AllFields = MergeWithCompare<Fields>;

const SignUp = () => {
	const {
		register,
		formState: { errors },
		setError,
		handleSubmit,
	} = useForm<Fields>();

	const [isDone, setIsDone] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (data: AllFields) => {
		setIsLoading(true);
		const { email, password } = data;
		if (checkCompares(data, setError)) {
			try {
				await signUp(email, password);
				setIsDone(true);
			} catch (e) {
				switch (e) {
					case 'auth/email-already-in-use':
						setError('email', {
							message: 'Email jest już w użyciu. Zapomniałeś hasła?',
						});
						break;
					case 'auth/network-request-failed':
						toast.error(
							'Nie udało się zarejestrować. Brak połączenia sieciowego.'
						);
						break;
					default:
						throw e;
				}
			}
			setIsLoading(false);
		}
	};
	return !isDone ? (
		<form onSubmit={handleSubmit(onSubmit)}>
			{/* TODO make spinner */}
			{isLoading && <p>Loading...</p>}
			<InputCompare
				type="email"
				label="Email"
				register={register}
				id="email"
				options={{
					pattern: { value: emailRegex, message: 'Niepoprawny email!' },
				}}
				errors={errors}
				required
			/>
			<InputCompare
				label="Hasło"
				type="password"
				register={register}
				id="password"
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
				required
			/>
			<Button type="submit">Zaloguj się</Button>
		</form>
	) : (
		<p>
			Rejestracja zakończona. Na twój email została wysłana wiadomość z linkiem
			aktywacyjnym konta :)
		</p>
	);
};

export default SignUp;
