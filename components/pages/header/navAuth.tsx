import Button from 'components/user-inputs/button';
import { useAuthDialog } from 'utils/contexts/auth-dialog';
import { useUser } from 'utils/contexts/user';
import { nbspU } from 'utils/globals';

const NavAuth = () => {
	const [, setShowAuth] = useAuthDialog();
	const [user] = useUser();
	const onClick = () => setShowAuth(true);
	const passProps = user ? { href: `uzytkownik/${user.uid}` } : { onClick };
	const label = user ? user.displayName || 'Konto' : `Zaloguj${nbspU}się`;

	// const passProps = user?null:{onClick};
	return (
		<Button {...passProps} clearStyles>
			{label}
		</Button>
	);
};

export default NavAuth;
