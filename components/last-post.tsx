import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactPlayer from 'react-player/youtube';
import { Post } from '../types';
import styles from '../styles/LastPost.module.scss';
// @ts-ignore
import CommentsIcon from '../public/comments.svg';

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
				<div className={styles['video-bar']}>
					<small className={styles.author}>{author.name}</small>
					<Image
						className={styles.avatar}
						src="/mock/avatar.jpg"
						width="25px"
						height="25px"
						alt="avatar"
						layout="fixed"
					/>
					<small className={styles['comments-count']}>
						{post.commentsCount}
					</small>
					{/* <Image src="/comments.svg" width="20px" height="17.5px" /> */}
					<CommentsIcon width="20px" height="17.5px" />
				</div>
				<ReactPlayer
					url={post.ytUrl}
					width="100%"
					className={styles['video-window']}
				/>
			</div>
		</section>
	);
};

// console.log("force");
export default LastPost;
