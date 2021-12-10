import { FC } from 'react';
import styles from '../styles/Calendar.module.scss';
import Button from './button';

const Calendar: FC = () => {
	return (
		<div className={styles.calendar}>
			<div className="top-bar">
				<h2 className={styles.h}>Kalendarz</h2>
				<nav className="buttons">
					<Button className="finger">☚</Button>
					<Button className="finger">☛</Button>
				</nav>
				<p className="month">październik</p>
				<p className="year">2021</p>
			</div>
		</div>
	);
};

export default Calendar;
