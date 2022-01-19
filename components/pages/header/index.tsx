import { FC, useState } from 'react';
import cn from 'classnames';
import styles from 'styles/Header.module.scss';
import Button from 'components/user-inputs/button';
import Logo from 'components/logo';
import Hamburger from 'components/hamburger';
import { useAuthDialog } from 'utils/contexts/auth-dialog';
import PagesLinks from './pages-links';

const Header: FC = () => {
	const [show, setShow] = useState(false);

	const menuToggle = () => setShow(!show);
	const [, setShowAuth] = useAuthDialog();

	return (
		<header className={cn(styles.header)}>
			<Logo className={styles.logo} />
			<Hamburger onClick={menuToggle} />

			<nav className={cn(styles.nav, { [styles['menu-open']]: show })}>
				<PagesLinks className={`${styles.link} cell`} />
				<Button onClick={() => setShowAuth(true)} clearStyles>
					Zaloguj&nbsp;się
				</Button>
			</nav>
		</header>
	);
};

export default Header;
