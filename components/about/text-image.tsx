import {
	Image,
	StructuredTextGraphQlResponse,
	StructuredText,
} from 'react-datocms';
import { DatoImg } from 'types';
import styles from 'styles/about/TwoColumn.module.scss';
import FixedImage from '../fixed-image';

interface Props {
	title: string;
	text?: StructuredTextGraphQlResponse;
	image?: DatoImg;
	className?: string;
	backgroundColor?: string;
	fixed?: boolean;
}

const TextImage = ({
	text,
	title,
	className = '',
	image,
	backgroundColor,
	fixed,
}: Props) => {
	const { responsiveImage } = image ?? {};
	let imageJSX;
	if (responsiveImage)
		imageJSX = fixed ? (
			<FixedImage className={styles.image} responsiveImage={responsiveImage} />
		) : (
			<Image data={responsiveImage} className={styles.image} />
		);
	// const content =
	// 	typeof text === 'string' ? text : <StructuredText data={text} />;

	return (
		<section
			className={`${styles['two-column']} ${className}`}
			style={backgroundColor ? { background: backgroundColor } : undefined}
		>
			<h2>{title}</h2>
			<div className={`${styles['two-column-flex']}`}>
				<article className={styles['first-column']}>
					<StructuredText data={text} />
				</article>
				{imageJSX}
			</div>
		</section>
	);
};

export default TextImage;
