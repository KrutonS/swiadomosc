import { FC } from 'react';
import { Post } from 'types';
// ignore false error
// @ts-ignore
import CommentsIcon from 'public/comments.svg';
import styles from 'styles/PostInfo.module.scss';
import cn from 'classnames';
import PostAuthor from './author';

type Props = Partial<Pick<Post, 'author' | 'category'>> & {
	commentsCount?: number;
	className?: string;
	hasBottomBar?: boolean;
	title?: string;
};

const PostInfo: FC<Props> = ({
	commentsCount = 0,
	author,
	category,
	hasBottomBar,
	title,
	className,
}) => {
	return (
		<div className={cn(styles.info, className)}>
			{title && <h3 className={styles.Text}>{title}</h3>}
			<PostAuthor author={author} />
			{category && <small className={styles.category}>{category.name}</small>}
			<div className={styles.comments}>
				<span className={styles['comments-count']}>{commentsCount}</span>
				<CommentsIcon className={styles['comments-icon']} />
			</div>
			{hasBottomBar && <div className={styles.BottomBar} />}
		</div>
	);
};

export default PostInfo;
