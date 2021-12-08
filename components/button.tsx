import { FC, MouseEventHandler, ReactNode } from 'react';
import Link from 'next/link';

import styles from '../styles/Button.module.scss';
import { ButtonTypes } from '../types';

interface ClickProps {
	onClick?: MouseEventHandler;
	type?: ButtonTypes;
}
interface LinkProps {
	href: string;
}

export type ButtonProps = {
	className?: string;
	children: ReactNode;
} & (ClickProps | LinkProps);

const Button: FC<ButtonProps> = props => {
	const { className = '', children } = props;
	const nodeClass = `${className} ${styles.btn}`;
	if ('href' in props) {
		const { href } = props;
		return (
			<Link href={href}>
				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<a className={nodeClass}>{children}</a>
			</Link>
		);
	}
	const { type = 'button', onClick } = props;
	return (
		// eslint-disable-next-line react/button-has-type
		<button type={type} onClick={onClick} className={nodeClass}>
			{children}
		</button>
	);
};

export default Button;
