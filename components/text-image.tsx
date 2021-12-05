import { FC } from 'react';
import Image from 'next/image';
import styles from '../styles/TwoColumn.module.scss';

interface Props {
	title: string;
	src: string;
	text: string;
	className?: string;
	backgroundColor?: string;
}

const TexTImage: FC<Props> = ({
	src,
	text,
	title,
	className = '',
	backgroundColor,
}) => {
	const inlineStyle = backgroundColor ? { backgroundColor } : {};
	return (
		<section
			className={`${styles['two-column']} ${className}`}
			style={inlineStyle}
		>
			<h2>{title}</h2>
			<div className={`${styles['two-column-flex']}`}>
				<article className={styles['first-column']}>{text}</article>
				<Image
					className={styles.image}
					src={src}
					layout="fill"
					objectFit="contain"
				/>
			</div>
		</section>
	);
};

export default TexTImage;
