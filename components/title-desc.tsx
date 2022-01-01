import cn from 'classnames';
import styles from '../styles/DescTitle.module.scss';

interface Props {
	title: string;
	desc: string;
	className?: string;
	leftSide?: boolean;
}

const DescTitle = ({ title, desc, className, leftSide }: Props) => {
	return (
		<div
			className={cn(
				styles.heading,
				styles[leftSide ? 'heading--left' : 'heading--right'],
				className
			)}
		>
			<h1 className={styles.title}>{title}</h1>
			<p className={styles['title-p']}>{desc}</p>
		</div>
	);
};

export default DescTitle;
