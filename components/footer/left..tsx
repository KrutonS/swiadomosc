import { FC } from 'react';
import Link from 'next/link';
import styles from '../../styles/Footer.module.scss';
import Button from '../button';
import Logo from '../logo';
import Address from './address';
// @ts-ignore
import Facebook from '../../public/facebook.svg';

// #region Local

type FCClass = FC<{ className?: string }>;
const Column: FCClass = ({ children, className = '' }) => (
	<div className={`${styles.column} ${className}`}>{children}</div>
);

// const Container: FCClass = ({ className = '', children }) => (
// 	<section className={`${styles.container} ${className}`}>{children}</section>
// );
const Line = () => <div className={styles.line} />;

// #endregion

const ADDRESS = {
	city: 'Sopot',
	street: 'Przykładowa 5/2',
	zip: '21-530',
};

const Left = () => (
	<div className={styles.left}>
		<div className={styles['left-top']}>
			<Logo className={styles.logo} />
			<Facebook viewBox="0 0 70 70" className={styles.facebook} alt="error" />
		</div>
		<Line />
		<div>
			<h5 className={styles['address-desktop']}>adres</h5>
			<nav className={styles.row}>
				<Column className={styles['address-desktop']}>
					<Address {...ADDRESS} />
				</Column>
				<Column>
					<Link href="/o-nas">O&nbsp;nas</Link>
					<Link href="/blog">Blog</Link>
				</Column>
				<Column>
					<Link href="/dyskusje">Dyskusje</Link>
					<Button href="/spotkania" className={styles.button}>
						Zapisz&nbsp;się
					</Button>
				</Column>
			</nav>
		</div>
		<Line />
		<div className={styles.contact}>
			<h5>kontakt</h5>
			<p>+48 555 555 555</p>
			<p className={styles.email}>swiadomosc@gmail.com</p>
		</div>
		<div className={styles['address-mobile']}>
			<Address {...ADDRESS} />
		</div>
	</div>
);
export default Left;
