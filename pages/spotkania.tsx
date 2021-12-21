import { gql } from '@apollo/client';
import DescTitle from 'components/desc-title';
import dato from 'lib/datocms';
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
			<DescTitle
				title="Spotkania"
				desc="Chciałbym zapisać się na..."
				leftSide
			/>
			{showCalendar && <Calendar meetings={meetings} />}
		</main>
	);
};
export const getStaticProps: GetStaticProps<QueryResponse> = async () => {
	const query = gql`
		query AllMeetings {
			allMeetings {
				id
				name
				weekly
				startTime
				length
			}
		}
	`;
	const {
		data: { allMeetings: meetings },
	} = await dato.query<{
		allMeetings: Meeting[];
	}>({ query });

	return { props: { meetings } };
};
export default MeetingsPage;
