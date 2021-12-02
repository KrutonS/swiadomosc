import cn from 'classnames';
import { FC } from 'react';
import Link from 'next/link';

import LogoSVG from '../public/logo.svg';
import styles from '../styles/Logo.module.scss';

interface Props {
	className?: string;
}

const Logo: FC<Props> = ({ className }) => {
	return (
		<Link href="/o-nas">
			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
			<a className={cn(styles.logo, className)}>
				<LogoSVG width="75" alt="logo" />
				<h1>ŚWiadomość</h1>
			</a>
		</Link>
	);
};

export default Logo;
