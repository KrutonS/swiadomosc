import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from 'styles/Video.module.scss';

interface Props {
	title: string;
	providerUid: string;
	height?: string | number;
	width?: string | number;
	className?: string;
}
const YoutubeEmbed = ({
	providerUid,
	title,
	height = 480,
	width = 360,
	className,
}: Props) => {
	const { ref, inView } = useInView({ threshold: 0, rootMargin: '200px 0px' });
	const [isShown, setIsShown] = useState(false);
	useEffect(() => {
		if (inView && !isShown) setIsShown(true);
	}, [inView, isShown]);
	return (
		<div className={cn(styles.video, className)} ref={ref}>
			{isShown ? (
				<iframe
					style={{ aspectRatio: `${width} / ${height}` }}
					src={`https://www.youtube.com/embed/${providerUid}?origin=https://grafikimaster.gatsbyjs.io/&enablejsapi=1`}
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					title={title}
				/>
			) : (
				<h4 className="accent-text">Ładowanie...</h4>
			)}
		</div>
	);
};

export default YoutubeEmbed;
