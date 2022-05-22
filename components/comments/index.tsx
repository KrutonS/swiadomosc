import Button from 'components/user-inputs/button';
import { useForm } from 'react-hook-form';
import { IComment } from 'types';
import addClientComment from 'utils/apiClient/comments/addClientComment';
import { useUser } from 'utils/contexts/user';
import { AppError } from 'utils/errors';
import Spinner from 'components/spinner';
import ErrorInfo from 'components/error-info';
import PostInfo from 'components/postInfo';
import classes from 'styles/comments.module.scss';
import Input from '../user-inputs/input';
import Comment from './comment';

interface Props {
	comments: IComment[];
	postId: string;
	error?: string;
	isValidating?: boolean;
	onRefresh: VoidFunction;
}
interface FormValues {
	commentContent: string;
}

const CommentsView = ({
	postId,
	comments,
	error,
	isValidating,
	onRefresh,
}: Props) => {
	const [user] = useUser();

	const {
		handleSubmit,
		register,
		formState: { errors },
		setError,
	} = useForm<FormValues>();

	const onSubmit = async ({ commentContent: content }: FormValues) => {
		if (!user) {
			setError('commentContent', {
				message: new AppError('auth/invalid-user-token').message,
			});
		} else {
			const { error: message } = await addClientComment({
				content,
				user,
				postId,
			});
			if (message) setError('commentContent', { message });
			else onRefresh();
		}
	};
	return (
		<div className={classes.Comments}>
			<PostInfo
				title="Komentarze"
				commentsCount={comments.length}
				hasBottomBar
			/>
			{error && <ErrorInfo clearPos>{error}</ErrorInfo>}
			{comments?.map(c => (
				// eslint-disable-next-line no-underscore-dangle
				<Comment key={c._id} {...c} />
			))}
			{isValidating && <Spinner />}
			{user && (
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						register={register}
						id="commentContent"
						className={classes.CommentsInput}
						label="Napisz komentarz"
						errors={errors}
						minLength={1}
						maxLength={500}
						required
						multiLine
					/>
					<Button className={classes.CommentsSubmit} type="submit">
						Wyślij
					</Button>
				</form>
			)}
		</div>
	);
};

export default CommentsView;
