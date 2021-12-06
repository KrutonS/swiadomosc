import { FC } from 'react';
import Image from 'next/image';
import Button, { ButtonProps } from './button';
import styles from '../styles/CallToAction.module.scss';

type Props = {
	backgroundUrl: string;
} & ButtonProps;

type ButtonAttributes = ButtonProps & Partial<Pick<Props, 'backgroundUrl'>>;

const CallToAction: FC<Props> = props => {
	const { children, backgroundUrl, className = '' } = props;
	const buttonProps: ButtonAttributes = { ...props };
	delete buttonProps.backgroundUrl;
	return (
		<section className={styles.section}>
			<Image
				src={backgroundUrl}
				layout="fill"
				objectFit="cover"
				className={styles.image}
			/>
			<Button
				{...buttonProps}
				className={`${styles['action-button']} ${className}`}
			>
				{children}
			</Button>
		</section>
	);
};

export default CallToAction;
