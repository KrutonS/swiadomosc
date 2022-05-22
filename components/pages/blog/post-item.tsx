import { FC } from 'react';
import { Post } from 'types';
import { Image } from 'react-datocms';
import styles from 'styles/PostItem.module.scss';
import Link from 'next/link';
import PostInfo from '../../postInfo';

interface Props {
	post: Pick<
		Post,
		| 'title'
		| 'author'
		| 'category'
		| 'slug'
		| 'picture'
		| 'commentsCount'
		| 'id'
	>;
}

const PostItem: FC<Props> = ({
	post: { picture, title, slug, commentsCount, ...postInfoProps },
}) => {
	const { responsiveImage: postImageData } = picture ?? {};

	return (
		<div className={styles.post}>
			<div className={styles.header}>
				<Link href={`/blog/${slug}`}>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a>
						<h4 className={styles.title}>{title}</h4>
					</a>
				</Link>
				<PostInfo
					{...postInfoProps}
					commentsCount={commentsCount}
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
