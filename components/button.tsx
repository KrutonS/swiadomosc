import { ButtonHTMLAttributes, FC, MouseEventHandler } from 'react';
import Link from 'next/link';

import styles from '../styles/Button.module.scss';

interface OnClickProps {
	onClick: MouseEventHandler;
	type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}
interface LinkProps {
	href: string;
}
export type ButtonProps = {
	className?: string;
} & (OnClickProps | LinkProps);

const Button: FC<ButtonProps> = props => {
	const { className = '', children } = props;
	const nodeClass = `${className} ${styles.btn}`;
	if ('onClick' in props) {
		const { type = 'button', onClick } = props;
		return (
			// eslint-disable-next-line react/button-has-type
			<button type={type} onClick={onClick} className={nodeClass}>
				{children}
			</button>
		);
	}
	if ('href' in props) {
		const { href } = props;
		return (
			<Link href={href}>
				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<a className={nodeClass}>{children}</a>
			</Link>
		);
	}
	return <p className="error">error</p>;
};

export default Button;
