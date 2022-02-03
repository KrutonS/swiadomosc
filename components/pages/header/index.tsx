import { FC, useState } from 'react';
import cn from 'classnames';
import styles from 'styles/Header.module.scss';
import Logo from 'components/logo';
import Hamburger from 'components/hamburger';
import PagesLinks from './pages-links';
import NavAuth from './navAuth';

const Header: FC = () => {
	const [show, setShow] = useState(false);

	const menuToggle = () => setShow(!show);

	return (
		<header className={cn(styles.header)}>
			<Logo className={styles.logo} />
			<Hamburger onClick={menuToggle} />

			<nav className={cn(styles.nav, { [styles['menu-open']]: show })}>
				<PagesLinks className={`${styles.link} cell`} />
				<NavAuth />
			</nav>
		</header>
	);
};

export default Header;
