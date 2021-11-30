import classNames from 'classnames';
import { FC } from 'react';

import PagesLinks from './pages-links';
import styles from '../styles/Header.module.css';
import Logo from './logo';

interface Props {
	showBackground?: boolean;
}

const Header: FC<Props> = ({ showBackground }) => {
	return (
		<header
			className={classNames(styles.header, {
				[`${styles.header}--bg`]: showBackground,
			})}
		>
			<Logo className={`${styles.header}__logo`} />
			<nav className={`${styles.header}__nav`}>
				<PagesLinks className={styles.link} />
			</nav>
		</header>
	);
};

export default Header;
