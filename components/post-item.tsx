// import Image from 'next/image';
import { FC } from 'react';
import { Post } from 'types';
import { Image } from 'react-datocms';
import styles from '../styles/PostItem.module.scss';
import CommentsIcon from '../public/comments.svg';

interface Props {
	post: Post;
}

const commentsCount = 12;

const PostItem: FC<Props> = ({
	post: { author, picture, category, title },
}) => {
	const {
		avatar: { responsiveImage: avatarImageData },
		id,
		name,
	} = author ?? { avatar: {} };

	const { responsiveImage: postImageData } = picture ?? {};

	return (
		<div className={styles.post}>
			<div className={styles.header}>
				<h4 className={styles.title}>{title}</h4>
				<div className={styles.info}>
					{name && avatarImageData && (
						<>
							<span className={styles.author}>{name}</span>
							<Image className={styles.avatar} data={avatarImageData} />
						</>
					)}
					{category && (
						<small className={styles.category}>{category.name}</small>
					)}
					{commentsCount && (
						<div className={styles.comments}>
							<span className={styles['comments-count']}>{commentsCount}</span>
							<CommentsIcon className={styles['comments-icon']} />
						</div>
					)}
				</div>
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
