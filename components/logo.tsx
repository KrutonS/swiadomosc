import classNames from 'classnames';
import { FC } from 'react';
import LogoSVG from '../assets/svg/logo.svg';
import styles from '../styles/Logo.module.css';

interface Props {
	className?: string;
}

const Logo: FC<Props> = ({ className }) => {
	return (
		<div className={classNames(styles.logo, className)}>
			<LogoSVG width="75" alt="logo" />
			<h1>ŚWiadomość</h1>
		</div>
	);
};

export default Logo;
