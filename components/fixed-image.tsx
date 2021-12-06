import { FC } from 'react';
import Image, { ImageProps } from 'next/image';
import styles from '../styles/FixedImage.module.scss';

const FixedImage: FC<ImageProps> = props => {
	const { className } = props;
	return (
		<div className={styles.wrapper}>
			<Image {...props} className={`${styles.image} ${className}`} />
		</div>
	);
};

export default FixedImage;
