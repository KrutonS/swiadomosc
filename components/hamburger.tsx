import { FC, MouseEventHandler } from 'react';
import styles from '../styles/Hamburger.module.scss';

interface Props {
	onClick: MouseEventHandler<HTMLButtonElement>;
}

const Hamburger: FC<Props> = ({ onClick }) => {
	return (
		<button type="button" onClick={onClick} className={styles.hamburger}>
			<div />
		</button>
	);
};

export default Hamburger;
