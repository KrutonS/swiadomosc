import { FC } from 'react';
import { Post } from 'types';
import { Image } from 'react-datocms';
import styles from 'styles/PostItem.module.scss';
import PostInfo from '../postInfo';

interface Props {
	post: Pick<Post, 'author' | 'picture' | 'category' | 'title'>;
}

const PostItem: FC<Props> = ({
	post: { picture, title, ...postInfoProps },
}) => {
	const { responsiveImage: postImageData } = picture ?? {};

	return (
		<div className={styles.post}>
			<div className={styles.header}>
				<h4 className={styles.title}>{title}</h4>
				{/* <div className={styles.info}>
					<PostAuthor author={author} />
					{category && (
						<small className={styles.category}>{category.name}</small>
					)}
					{commentsCount && (
						<div className={styles.comments}>
							<span className={styles['comments-count']}>{commentsCount}</span>
							<CommentsIcon className={styles['comments-icon']} />
						</div>
					)}
				</div> */}
				<PostInfo
					{...postInfoProps}
					commentsCount={12}
					className={styles.info}
				/>
			</div>
			{postImageData && (
				// <div className={styles['image-wrapper']}>
				<Image className={styles.image} data={postImageData} />
				// </div>
			)}
		</div>
	);
};

export default PostItem;
