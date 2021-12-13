import cn from 'classnames';
import { FC, useState } from 'react';
import Link from 'next/link';

import PagesLinks from './pages-links';
import styles from '../styles/Header.module.scss';
import Logo from './logo';
import Hamburger from './hamburger';

const Header: FC = () => {
	const [show, setShow] = useState(false);

	const menuToggle = () => setShow(!show);

	return (
		<header
			className={cn(styles.header)}
			// 	[styles['show-bg']] showBackground,
		>
			<Logo className={styles.logo} />
			<Hamburger onClick={menuToggle} />

			{/* <div className={styles['nav-wrapper']}> */}
			<nav className={cn(styles.nav, { [styles['menu-open']]: show })}>
				<PagesLinks className={`${styles.link} cell`} />
				<Link href="/login">
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a className={`${styles.link} page-link cell`}>Zaloguj&nbsp;się</a>
				</Link>
			</nav>
			{/* </div> */}
		</header>
	);
};

export default Header;
