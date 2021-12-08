import { FC } from 'react';
import Link from 'next/link';
import styles from '../../styles/Footer.module.scss';
import Button from '../button';
import Logo from '../logo';

const Left: FC = () => (
	<div className={styles.left}>
		<section className={styles.row}>
			<Logo />
			{/* <Socials /> */} <div />
			<section className={styles.row}>
				<div className={styles.line} />
				<h4>adres</h4>
				<div className={styles.column}>
					<div>Sopot</div>
					<div>ul. przykładowa 5/2</div>
					<div>21-530</div>
				</div>
				<div className={styles.column}>
					<Link href="/o-nas">O nas</Link>
					<Link href="/blog">Blog</Link>
				</div>
				<div className={styles.column}>
					<Link href="/dyskusje">Dyskusje</Link>
					<Button href="/spotkania">Zapisz się</Button>
				</div>
			</section>
			<div className={styles.line} />
			<section className={styles.row}>
				<h4>kontakt</h4>
				<p>+48 555 555 555</p>
				<p>swiadomosc@gmail.com</p>
			</section>
		</section>
	</div>
);
export default Left;
