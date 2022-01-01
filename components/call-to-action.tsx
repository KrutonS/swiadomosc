// import Image from 'next/image';
import { Image, ResponsiveImageType } from 'react-datocms';
import { FC } from 'react';
import styles from 'styles/about/CallToAction.module.scss';
import Button, { ButtonProps } from './button';

type Props = {
	imageData?: ResponsiveImageType;
} & ButtonProps;

const CallToAction: FC<Props> = ({ imageData, className, ...buttonProps }) => {
	return (
		<section className={styles.section}>
			{imageData && (
				<Image
					data={imageData}
					// layout="fill"
					// objectFit="cover"
					className={styles.image}
				/>
			)}
			<Button
				{...buttonProps}
				className={`${styles['action-button']} ${className}`}
			/>
		</section>
	);
};

export default CallToAction;
