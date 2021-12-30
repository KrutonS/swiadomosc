import { FC, useMemo } from 'react';
import { StructuredText, StructuredTextDocument } from 'react-datocms';
import { TextListRecord } from 'types';
import styles from '../styles/TwoColumn.module.scss';

interface Props {
	title: string;
	title2?: string;
	text?: StructuredTextDocument;
	listItems?: TextListRecord['list'];
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
		() => listItems && { maxHeight: `${listItems.length * 6}em` },
		[listItems]
	);

	return (
		// null
		<section id="beginning" className={`${styles['two-column']} ${className}`}>
			<h1 className={styles.title}>{title}</h1>
			<div className={styles['two-column-flex']}>
				<article className={styles['first-column']}>
					<StructuredText data={text} />
				</article>
				<div className={styles['second-column']} style={listStyle}>
					<h3>{title2}</h3>
					<ol className={styles['two-column-list']}>
						{listItems?.map(({ text: listText, id }) => (
							<li key={id}>{listText}</li>
						))}
					</ol>
				</div>
			</div>
		</section>
	);
};

export default TextList;
