import { FC } from 'react';
import Link from 'next/link';
import { Contact } from 'types';
import styles from 'styles/Footer.module.scss';
import Button from 'components/user-inputs/button';
import Logo from 'components/logo';
// @ts-ignore
import Facebook from 'public/facebook.svg';
import Address from './address';
import ContactInfo from './contact-info';

// #region Local

type FCClass = FC<{ className?: string }>;
const Column: FCClass = ({ children, className = '' }) => (
	<div className={`${styles.column} ${className}`}>{children}</div>
);

const Line = () => <div className={styles.line} />;

// #endregion

const Left = ({ city, email, street, zip, phone }: Contact['contact']) => {
	const addressProps = { city, street, zip };
	const hasAddress = city || street || zip;
	return (
		<div className={styles.left}>
			<div className={styles['left-top']}>
				<Logo className={styles.logo} />
				<Facebook viewBox="0 0 70 70" className={styles.facebook} alt="error" />
			</div>
			<Line />
			<div>
				{hasAddress && <h5 className={styles['address-desktop']}>adres</h5>}
				<nav className={styles.row}>
					<Column className={styles['address-desktop']}>
						<Address {...addressProps} />
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
			<ContactInfo email={email} phone={phone} />
			<div className={styles['address-mobile']}>
				<Address {...addressProps} />
			</div>
		</div>
	);
};
export default Left;
