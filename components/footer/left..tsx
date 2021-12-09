import { FC } from 'react';
import Link from 'next/link';
import styles from '../../styles/Footer.module.scss';
import Button from '../button';
import Logo from '../logo';
import Address from './address';

// #region Local

type FCClass = FC<{ className?: string }>;
const Column: FCClass = ({ children, className = '' }) => (
	<div className={`${styles.column} ${className}`}>{children}</div>
);

const Row: FCClass = ({ className = '', children }) => (
	<section className={`${styles.row} ${className}`}>{children}</section>
);
const Line = () => <div className={styles.line} />;

// #endregion

const ADDRESS = {
	city: 'Sopot',
	street: 'Przykładowa 5/2',
	zip: '21-530',
};

const Left = () => (
	<div className={styles.left}>
		<Row>
			<Logo className={styles.logo} />
			{/* <Socials /> */} <div />
		</Row>
		<Line />
		<nav className={`${styles.row} ${styles.navigation}`}>
			<h4>adres</h4>
			<Column className={styles['address-desktop']}>
				<Address {...ADDRESS} />
			</Column>
			<Column>
				<Link href="/o-nas">O nas</Link>
				<Link href="/blog">Blog</Link>
			</Column>
			<Column>
				<Link href="/dyskusje">Dyskusje</Link>
				<Button href="/spotkania" className={styles.button}>
					Zapisz się
				</Button>
			</Column>
		</nav>
		<Line />
		<Row className={styles.contact}>
			<h4>kontakt</h4>
			<p>+48 555 555 555</p>
			<p className={styles.email}>swiadomosc@gmail.com</p>
		</Row>
		<div className={styles['address-mobile']}>
			<Address {...ADDRESS} />
		</div>
	</div>
);
export default Left;
