import { gql } from '@apollo/client';
import DescTitle from 'components/pages/title-desc';
import Layout from 'components/pages/layout';
import dato, { contactFragment, SEOFragment } from 'lib/datocms';
import { GetStaticProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { CalendarData, Contact, Meeting } from 'types';
import Calendar from 'components/pages/calendar';
import styles from 'styles/meetings/Meetings.module.scss';

type Data = { meetings: Meeting[] } & Contact & CalendarData;

const MeetingsPage: NextPage<Data> = ({
	meetings,
	contact,
	meetingsPage: calendarData,
}) => {
	const [showCalendar, setShowCalendar] = useState(false);

	useEffect(() => {
		setShowCalendar(true);
	}, []);

	return (
		<Layout contact={contact} seoData={calendarData.seoMetaTags}>
			<main className={styles.main}>
				<DescTitle
					title="Spotkania"
					desc="Chciałbym zapisać się na..."
					leftSide
				/>
				{showCalendar && <Calendar meetings={meetings} data={calendarData} />}
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
			meetingsPage {
					${SEOFragment}
					maxHour
					minHour
					hourStep
					minDay
					maxDay
					height
				}
			${contactFragment}
		}
	`;
	type Response = Omit<Data, 'meetings'> & { allMeetings: Data['meetings'] };
	const {
		data: { allMeetings: meetings, ...otherData },
	} = await dato<Response>({ query });

	return { props: { meetings, ...otherData } };
};

export default MeetingsPage;
