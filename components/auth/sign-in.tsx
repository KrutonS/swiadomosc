import Spinner from 'components/spinner';
import Button from 'components/user-inputs/button';
import Input from 'components/user-inputs/input';
import { signIn } from 'lib/firebase';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { EmailWIthPassword } from 'types';
import { commonEmailProps, commonPassProps } from 'utils/inputProps';

const SignInForm = () => {
	const { register, handleSubmit } = useForm<EmailWIthPassword>();
	const [loading, setLoading] = useState(false);

	const onSubmit = async ({ email, password }: EmailWIthPassword) => {
		setLoading(true);
		await signIn(email, password, toast.error);
		setLoading(false);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{loading && <Spinner />}
			<Input {...commonEmailProps} register={register} />
			<Input {...commonPassProps} register={register} />
			<Button type="submit">Zaloguj się</Button>
		</form>
	);
};

export default SignInForm;
