import { CSSProperties, FC } from 'react';
import styles from '../styles/TwoColumn.module.scss';
import FixedImage from './fixed-image';

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
	const sectionStyle: CSSProperties = backgroundColor
		? { backgroundColor }
		: {};
	return (
		<section
			className={`${styles['two-column']} ${className}`}
			style={sectionStyle}
		>
			<h2>{title}</h2>
			<div className={`${styles['two-column-flex']}`}>
				<article className={styles['first-column']}>{text}</article>
				<FixedImage
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
