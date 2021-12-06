import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactPlayer from 'react-player/youtube';
import { Post } from '../types';
import styles from '../styles/LastPost.module.scss';

interface Props {
	title: string;
	post: Post;
}

const LastPost: FC<Props> = ({ title, post }) => {
	const { author } = post;
	return (
		<section className={styles.post}>
			<h2>{title}</h2>
			<h3 className={styles['post-title']}>
				<Link href="/">{post.title}</Link>
			</h3>
			<div className={styles['video-layout']}>
				<div className={styles['top-bar']}>
					<small>{author.name}</small>
					<Image src="/mock/avatar.jpg" width="25px" height="23px" />
					<small>{post.commentsCount}</small>
					<Image src="/comments.svg" width="20px" height="17.5px" />
				</div>
				<ReactPlayer
					url={post.ytUrl}
					width="100%"
					// height="450px"
					className={styles['video-window']}
					// display="initial"
				/>
			</div>
		</section>
	);
};

// console.log("force");
export default LastPost;
