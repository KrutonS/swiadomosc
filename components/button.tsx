import {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	forwardRef,
	MouseEventHandler,
	ReactNode,
	RefObject,
} from 'react';
import Link from 'next/link';
import cn from 'classnames';

import styles from '../styles/Button.module.scss';
import { ButtonTypes } from '../types';

type ClickProps = {
	onClick?: MouseEventHandler;
	type?: ButtonTypes;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type LinkProps = {
	href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonProps = {
	className?: string;
	children: ReactNode;
} & (ClickProps | LinkProps);

const Button = forwardRef<HTMLElement | HTMLAnchorElement, ButtonProps>(
	({ children, className, ...props }, ref) => {
		// const { className = '', children } = props;
		const nodeClass = cn(className, styles.btn);
		if ('href' in props) {
			const { href, ...attrs } = props;
			return (
				<Link href={href}>
					<a
						className={nodeClass}
						ref={ref as RefObject<HTMLAnchorElement>}
						{...attrs}
					>
						{children}
					</a>
				</Link>
			);
		}
		const { type = 'button', onClick, ...attrs } = props;
		return (
			<button
				// eslint-disable-next-line react/button-has-type
				type={type}
				onClick={onClick}
				className={nodeClass}
				ref={ref as RefObject<HTMLButtonElement>}
				{...attrs}
			>
				{children}
			</button>
		);
	}
);

export default Button;
