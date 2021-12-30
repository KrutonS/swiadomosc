import { FC } from 'react';
import Link from 'next/link';
import { Image } from 'react-datocms';
import ReactPlayer from 'react-player/youtube';
import cn from 'classnames';
import { Post } from '../types';
import styles from '../styles/LastPost.module.scss';
// @ts-ignore
import CommentsIcon from '../public/comments.svg';

interface Props {
	title: string;
	post: Required<Pick<Post, 'showcasedVideo' | 'author' | 'title'>>;
}

const LastPost: FC<Props> = ({ title, post }) => {
	const {
		author,
		showcasedVideo: { url: videoUrl },
	} = post;
	return (
		<section className={styles.post}>
			<h2>{title}</h2>
			<h3
				className={cn(styles.title, {
					[styles['title--short']]: post.title.length < 15,
				})}
			>
				<Link href="/">{post.title}</Link>
			</h3>
			<div className={styles['video-layout']}>
				<div className={styles['video-bar']}>
					{author && (
						<>
							<small className={styles.author}>{author.name}</small>
							<Image
								className={styles.avatar}
								data={{
									...author.avatar.responsiveImage,
									alt: `${author.name} avatar`,
								}}
							/>
						</>
					)}
					<small className={styles['comments-count']}>{12}</small>
					{/* <Image src="/comments.svg" width="20px" height="17.5px" /> */}
					<CommentsIcon width="20px" height="17.5px" />
				</div>
				<ReactPlayer
					url={videoUrl}
					width="100%"
					className={styles['video-window']}
				/>
			</div>
		</section>
	);
};

// console.log("force");
export default LastPost;
