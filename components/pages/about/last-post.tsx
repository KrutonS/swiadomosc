import { FC } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { Post } from 'types';
import styles from 'styles/about/LastPost.module.scss';
import YoutubeEmbed from 'components/video';
import PostInfo from 'components/postInfo';

interface Props {
	title: string;
	post: Required<Pick<Post, 'showcasedVideo' | 'author' | 'title'>>;
}

const LastPost: FC<Props> = ({ title, post }) => {
	const { showcasedVideo, author } = post;
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
				<PostInfo author={author} commentsCount={12} className={styles.info} />
				<YoutubeEmbed {...showcasedVideo} className={styles['video-window']} />
			</div>
		</section>
	);
};

// console.log("force");
export default LastPost;
