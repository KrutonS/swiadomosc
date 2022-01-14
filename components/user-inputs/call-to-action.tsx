// import Image from 'next/image';
import { Image, ResponsiveImageType } from 'react-datocms';
import { FC } from 'react';
import styles from 'styles/about/CallToAction.module.scss';
import Button, { ButtonProps } from './button';

type Props = {
	imageData?: ResponsiveImageType;
} & ButtonProps;

/* 
BUG
Can't perform a React state update on an unmounted component.
 This is a no-op, but it indicates a memory leak in your application.
 To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
*/

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
