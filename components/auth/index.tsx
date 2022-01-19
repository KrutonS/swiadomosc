import Button from 'components/user-inputs/button';
import { useState } from 'react';
import styles from 'styles/Auth.module.scss';
import { useAuthDialog } from 'utils/contexts/auth-dialog';
import SignInForm from './sign-in';
import SignUpForm from './sign-up';

const questions = ['Nie masz jeszcze konta?', 'Masz już konto?'];
const buttonLabels = ['Zarejestruj się!', 'Zaloguj się!'];

// type ElementsProps = { onClick: () => void };
// const SignUpElements = ({ onClick }: ElementsProps) => {
// 	return (
// 		<>
// 			<SignUpForm />
// 			<p>Masz już konto?</p>
// 			<Button onClick={onClick} clearStyles>
// 				Zaloguj się!
// 			</Button>
// 		</>
// 	);
// };
// const SignInElements = ({ onClick }: ElementsProps) => {
// 	return (
// 		<>
// 			<SignInForm />
// 			<p>Nie masz jeszcze konta?</p>
// 			<Button onClick={onClick} clearStyles>
// 				Zarejestruj się!
// 			</Button>
// 		</>
// 	);
// };

const AuthDialog = () => {
	const [shouldRegister, setShouldRegister] = useState(false);
	const toggle = () => setShouldRegister(!shouldRegister);
	const [show, setShow] = useAuthDialog();

	if (show)
		return (
			<section className={styles['auth-dialog']}>
				{shouldRegister ? <SignUpForm /> : <SignInForm />}
				<p>{questions[+shouldRegister]}</p>
				<Button onClick={toggle} className={styles.toggle} clearStyles>
					{buttonLabels[+shouldRegister]}
				</Button>

				{/* Exit button */}
				<Button
					onClick={() => setShow(false)}
					className={styles.exit}
					clearStyles
				>
					X
				</Button>
			</section>
		);

	return null;
};

export default AuthDialog;
