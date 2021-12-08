import Image from 'next/image';
import { FC } from 'react';
import Button, { ButtonProps } from './button';
import styles from '../styles/CallToAction.module.scss';

type Props = {
	backgroundUrl: string;
} & ButtonProps;

const CallToAction: FC<Props> = ({
	backgroundUrl,
	className,
	...buttonProps
}) => {
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
			/>
		</section>
	);
};

export default CallToAction;
