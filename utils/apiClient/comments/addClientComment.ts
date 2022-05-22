import { User } from 'firebase/auth';
import { IComment } from 'types';
import xss from 'xss';
import nextApiFetch from '../nextApiFetch';

interface Arg {
	user: User;
	postId: IComment['postId'];
	content: string;
}
export default function addClientComment({ content, postId, user }: Arg) {
	return nextApiFetch<IComment>('/api/comments', {
		method: 'POST',
		body: JSON.stringify({
			uuid: user?.uid,
			author: user?.displayName,
			content: xss(content),
			postId,
			stamp: Date.now(),
		} as IComment),
	});
}
