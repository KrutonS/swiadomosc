import cn from 'classnames';
import { FC } from 'react';
import LogoSVG from '../assets/svg/logo.svg';
import styles from '../styles/Logo.module.scss';

interface Props {
	className?: string;
}

const Logo: FC<Props> = ({ className }) => {
	console.log(className);

	return (
		<div className={cn(styles.logo, className)}>
			<LogoSVG width="75" alt="logo" />
			<h1>ŚWiadomość</h1>
		</div>
	);
};

export default Logo;
