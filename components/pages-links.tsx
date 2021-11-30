/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import Link from 'next/link';
import cn from 'classnames';

interface Props {
	className?: string;
}

const PagesLinks: FC<Props> = ({ className }) => {
	return (
		<>
			<Link href="/o-nas">
				<a className={cn('page-link', className)}>O nas</a>
			</Link>
			<Link href="/spotkania">
				<a className={cn('page-link', className)}>Spotkania</a>
			</Link>
			<Link href="/blog">
				<a className={cn('page-link', className)}>Blog</a>
			</Link>
			<Link href="/dyskusje">
				<a className={cn('page-link', className)}>Dyskusje</a>
			</Link>
		</>
	);
};

export default PagesLinks;
