import { FC } from 'react';
import { Image, ResponsiveImageType } from 'react-datocms';
import styles from 'styles/about/Hero.module.scss';

interface Props {
	// src: string;
	imageData: ResponsiveImageType;
}

const Hero: FC<Props> = ({ imageData }) => {
	return (
		<section className={styles.hero}>
			<Image
				data={{ alt: 'główny obraz', ...imageData }}
				className={styles.image}
			/>
			<a href="#beginning" className={styles['scroll-button']}>
				V
			</a>
		</section>
	);
};

export default Hero;
