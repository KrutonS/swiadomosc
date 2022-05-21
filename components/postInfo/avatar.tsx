import cn from 'classnames';
import { FC } from 'react';
import { Image } from 'react-datocms';
import styles from 'styles/PostInfo.module.scss';
import { Author } from 'types';

interface Props {
	author: Pick<Author, 'name'> & Partial<Pick<Author, 'avatar'>>;
	className?: string;
}

const Avatar: FC<Props> = ({ author, className }) => {
	const { avatar, name } = author;
	const data = avatar?.responsiveImage;
	return data ? (
		<Image
			className={cn(styles.avatar, className)}
			data={{ ...data, alt: `${name} logo` }}
		/>
	) : null;
};

export default Avatar;
