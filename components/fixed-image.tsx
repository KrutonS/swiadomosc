import { FC } from 'react';
import Image, { ImageProps } from 'next/image';
import { Image as DatoImage } from 'react-datocms';
import { DatoImg } from 'types';
import styles from 'styles/FixedImage.module.scss';

type Props = {
	className?: string;
} & (ImageProps | Omit<DatoImg, 'fixed'>);

const FixedImage: FC<Props> = props => {
	const { className = '' } = props;
	let imageNode;
	if ('responsiveImage' in props) {
		const { responsiveImage, ...otherProps } = props;
		imageNode = (
			<DatoImage
				{...otherProps}
				data={responsiveImage}
				className={`${styles.image} ${className}`}
			/>
		);
	} else
		imageNode = <Image {...props} className={`${styles.image} ${className}`} />;
	return <div className={styles.wrapper}>{imageNode}</div>;
};

export default FixedImage;
