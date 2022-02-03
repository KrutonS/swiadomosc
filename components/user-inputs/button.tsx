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

import styles from 'styles/Button.module.scss';
import { ButtonTypes } from '../../types';

interface CommonProps {
	className?: string | string[];
	children: ReactNode;
	clearStyles?: boolean;
}

type ClickProps = Omit<
	{
		onClick?: MouseEventHandler;
		type?: ButtonTypes;
	} & ButtonHTMLAttributes<HTMLButtonElement>,
	keyof CommonProps
>;

type LinkProps = Omit<
	{
		href: string;
	} & AnchorHTMLAttributes<HTMLAnchorElement>,
	keyof CommonProps
>;

export type ButtonProps = CommonProps & (ClickProps | LinkProps);

const Button = forwardRef<HTMLElement | HTMLAnchorElement, ButtonProps>(
	({ children, className, clearStyles, ...props }, ref) => {
		// const { className = '', children } = props;
		const nodeClass = cn(className, { [styles.btn]: !clearStyles });
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
