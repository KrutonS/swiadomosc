import { FC } from 'react';
import Image from 'next/image';
import styles from '../styles/Hero.module.scss';

interface Props {
	src: string;
}

const Hero: FC<Props> = ({ src }) => {
	return (
		<section className={styles.hero}>
			<Image
				src={src}
				layout="fill"
				objectFit="cover"
				className={styles.image}
			/>
			<a href="#beginning" className={styles['scroll-button']}>
				V
			</a>
		</section>
	);
};

export default Hero;
