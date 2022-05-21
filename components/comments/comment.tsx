import PostAuthor from 'components/postInfo/author';
import { IComment } from 'types';
import classes from '../../styles/comments.module.scss';

const Comment = ({
	author,
	content,
	stamp,
}: Pick<IComment, 'author' | 'content' | 'stamp'>) => {
	const date = new Date(stamp).toLocaleDateString();
	return (
		<div className={classes.Comment}>
			<div className={classes.CommentInfo}>
				<PostAuthor author={{ name: author }} />
				{date && <small className={classes.Date}>{date}</small>}
			</div>
			<div className={classes.Content}>{content}</div>
		</div>
	);
};

export default Comment;
