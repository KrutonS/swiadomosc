import datoReq from 'lib/datocms';
import { GetStaticProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Meeting } from 'types';
import Calendar from '../components/calendar';
import styles from '../styles/Meetings.module.scss';

type QueryResponse = { meetings: Meeting[] };

const MeetingsPage: NextPage<QueryResponse> = ({ meetings }) => {
	const [showCalendar, setShowCalendar] = useState(false);
	// console.log(allMeetings);
	useEffect(() => {
		setShowCalendar(true);
	}, []);

	return (
		<main className={styles.main}>
			<div className={styles.heading}>
				<h1 className={styles.title}>Spotkania</h1>
				<p className={styles['title-p']}>Chciałbym zapisać się na...</p>
			</div>
			{showCalendar && <Calendar meetings={meetings} />}
		</main>
	);
};
export const getStaticProps: GetStaticProps<QueryResponse> = async () => {
	// const allMeetings = (await getAllMeetings()) ?? [];
	const query = `
	query AllMeetings{
		allMeetings {
			id
			name
			weekly
			startTime
			length
		}
	}`;
	const { allMeetings: meetings } = await datoReq<
		{ allMeetings: Meeting[] },
		never
	>(query);
	// const grouped = meetingsByWeekly(allMeetings);
	// return { props: { meetings: grouped } };

	return { props: { meetings } };
};
export default MeetingsPage;
