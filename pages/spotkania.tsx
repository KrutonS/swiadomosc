import { FC } from 'react';
import Calendar from '../components/calendar';
import styles from '../styles/Meetings.module.scss';

const MeetingsPage: FC = () => {
	return (
		<main className={styles.main}>
			<div className={styles.heading}>
				<h1 className={styles.title}>Spotkania</h1>
				<p className={styles['title-p']}>Chciałbym zapisać się na...</p>
			</div>
			<Calendar />
		</main>
	);
};

export default MeetingsPage;
