import { FC } from 'react';
import styles from '../../styles/Footer.module.scss';
import Left from './left.';
import Right from './right';

const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<Left />
			<Right />
			<small className={styles.copyright}>
				Copyright 2022 Marcin Smarzewski
			</small>
		</footer>
	);
};

export default Footer;
