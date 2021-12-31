import { FC } from 'react';
import { Contact } from 'types';
import styles from '../../styles/Footer.module.scss';
import Left from './left.';
import Right from './right';

const Footer: FC<Contact> = ({ contact }) => {
	return (
		<footer className={styles.footer}>
			<div className={styles.main}>
				<Left {...contact} />
				<Right />
			</div>

			<small className={styles.copyright}>
				Copyright&nbsp;2022 Marcin&nbsp;Smarzewski
			</small>
		</footer>
	);
};

export default Footer;
