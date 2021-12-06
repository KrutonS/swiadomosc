import { FC, useMemo } from 'react';
import styles from '../styles/TwoColumn.module.scss';

interface Props {
	text: string;
	listItems: string[];
	title: string;
	title2: string;
	className?: string;
}

const TextList: FC<Props> = ({
	text,
	listItems,
	title,
	title2,
	className = '',
}) => {
	const listStyle = useMemo(
		() => ({ maxHeight: `${listItems.length * 6}em` }),
		[listItems]
	);
	return (
		<section id="beginning" className={`${styles['two-column']} ${className}`}>
			<h1>{title}</h1>
			<div className={styles['two-column-flex']}>
				<article className={styles['first-column']}>{text}</article>
				<div className={styles['second-column']} style={listStyle}>
					<h3>{title2}</h3>
					<ol className={styles['two-column-list']}>
						{listItems.map(v => (
							<li key={v}>{v}</li>
						))}
					</ol>
				</div>
			</div>
		</section>
	);
};

export default TextList;
