import { gql } from '@apollo/client';
import DescTitle from 'components/title-desc';
import Layout from 'components/layout';
import dato, { contactFragment } from 'lib/datocms';
import { GetStaticProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Contact, Meeting } from 'types';
import Calendar from 'components/calendar';
import styles from 'styles/meetings/Meetings.module.scss';

type Data = { meetings: Meeting[] } & Contact;

const MeetingsPage: NextPage<Data> = ({ meetings, contact }) => {
	const [showCalendar, setShowCalendar] = useState(false);
	// console.log(allMeetings);
	useEffect(() => {
		setShowCalendar(true);
	}, []);

	return (
		<Layout contact={contact}>
			<main className={styles.main}>
				<DescTitle
					title="Spotkania"
					desc="Chciałbym zapisać się na..."
					leftSide
				/>
				{showCalendar && <Calendar meetings={meetings} />}
			</main>
		</Layout>
	);
};
export const getStaticProps: GetStaticProps<Data> = async () => {
	const query = gql`
		query AllMeetings {
			allMeetings {
				id
				name
				weekly
				startTime
				length
			}
			${contactFragment}
		}
	`;
	type Response = Omit<Data, 'meetings'> & { allMeetings: Data['meetings'] };
	const {
		data: { allMeetings: meetings, contact },
	} = await dato<Response>({ query });

	return { props: { meetings, contact } };
};
export default MeetingsPage;
