import { FC } from 'react';
import { Author } from 'types';
import styles from 'styles/PostInfo.module.scss';
import Avatar from './avatar';

interface Props {
	author?: Pick<Author, 'name'> & Partial<Pick<Author, 'avatar'>>;
}

const PostAuthor: FC<Props> = ({ author }) => {
	return author ? (
		<>
			<small className={styles.author}>{author.name}</small>
			<Avatar className={styles.avatar} author={author} />
		</>
	) : null;
};

export default PostAuthor;
