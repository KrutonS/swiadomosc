import Spinner from 'components/spinner';
import Button from 'components/user-inputs/button';
import Input from 'components/user-inputs/input';
import { UserCredential } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { EmailWIthPassword } from 'types';
import { useAuthDialog } from 'utils/contexts/auth-dialog';
import { useUser } from 'utils/contexts/user';
import { UserNotVerifiedError } from 'utils/errors';
import { signIn } from 'utils/firebase/auth';
import { useAsync } from 'utils/hooks/async';
import { useFormError } from 'utils/hooks/errors';
import { commonEmailProps, commonPassProps } from 'utils/inputProps';

const SignInForm = () => {
	const { register, handleSubmit, setError, control } =
		useForm<EmailWIthPassword>();
	const [, setUser] = useUser();

	const [, setShowDialog] = useAuthDialog();

	const { generalError, errorHandler, refreshError } = useFormError(
		setError,
		{
			'auth/invalid-email': 'email',
			'auth/email-already-in-use': 'email',
		},
		control
	);

	const onSuccess = ({ user }: UserCredential) => {
		if (!user.emailVerified) throw new UserNotVerifiedError();
		setShowDialog(false);
		setUser(user);
	};

	const { loading, handler: signInHandler } = useAsync(
		(data: EmailWIthPassword) => {
			refreshError();
			return signIn(data);
		},
		onSuccess,
		errorHandler
	);

	return (
		<form onSubmit={handleSubmit(data => signInHandler(data))}>
			{loading && <Spinner />}
			<Input {...commonEmailProps} register={register} />
			<Input {...commonPassProps} register={register} />
			<p className="error">{generalError}</p>
			<Button type="submit">Zaloguj się</Button>
		</form>
	);
};

export default SignInForm;
