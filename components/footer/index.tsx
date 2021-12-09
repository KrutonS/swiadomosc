import { FC } from 'react';
import styles from '../../styles/Footer.module.scss';
import Left from './left.';
import Right from './right';

const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.main}>
				<Left />
				<Right />
			</div>

			<small className={styles.copyright}>
				Copyright&nbsp;2022 Marcin&nbsp;Smarzewski
			</small>
		</footer>
	);
};

export default Footer;
