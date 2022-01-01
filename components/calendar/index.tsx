import {
	FC,
	ReactNode,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';

import dayRange from 'utils/date/dayRange';
import getMonthName from 'utils/date/monthNames';
import debounce from 'utils/debounce';
import getDayName from 'utils/date/dayName';
import styles from 'styles/meetings/Calendar.module.scss';
import clamp from 'utils/math/clamp';
import forwardDays from 'utils/date/forwardDays';
import { CalendarData, Meeting } from 'types';
import { groupMeetings } from 'utils/meetings';
import Button from 'components/button';
import setStartOfDay from 'utils/date/startOfDay';
import setEndOfDay from 'utils/date/endOfDay';
import Column from './column';

// #region Locals
const columnWidth = 220;
// const minHour = 8;
// const maxHour = 22;
// const hourStep = 1;
// const minDay = 1;
// const maxDay = 5;
const getReliableDate = (
	minDay: number,
	maxDay: number,
	date = new Date(),
	inverse = false
): Date => {
	const day = date.getDay();
	if (day > maxDay) {
		const daysToGo = inverse ? maxDay - day : day - maxDay + minDay;
		return forwardDays(date, daysToGo);
	}
	if (day < minDay) {
		const daysToGo = inverse ? maxDay - 6 - minDay : minDay - day;
		return forwardDays(date, daysToGo);
	}
	return date;
};
function monthRangeString(date1: Date, date2: Date) {
	const month1 = date1.getMonth();
	const month2 = date2.getMonth();
	if (month1 !== month2) {
		const monthShort1 = getMonthName(month1, true);
		const monthShort2 = getMonthName(month2, true);
		return `${monthShort1} - ${monthShort2}`;
	}
	return getMonthName(month1);
}
function getDays(
	minDay: number,
	maxDay: number,
	date: Date,
	columnsCount: number
) {
	const daysCount = maxDay - minDay;
	if (columnsCount >= daysCount) return dayRange(date, minDay, maxDay);

	const currentDay = date.getDay();
	const min = Math.floor(currentDay / columnsCount) * columnsCount;
	const max = min + columnsCount - 1;
	return dayRange(date, min, max);
}
//#endregion
interface Props {
	meetings: Meeting[];
	data: CalendarData['calendar'];
}
const Calendar: FC<Props> = ({ meetings, data }) => {
	// TODO optimizations
	const { hourStep, maxHour, minHour, height: calendarHeight } = data;
	const minDay = parseInt(data.minDay, 10);
	const maxDay = parseInt(data.maxDay, 10);

	const [columnsCount, setColumsCount] = useState(1);
	const [hourHeight, setHourHeight] = useState(1);
	const [date, setDate] = useState(getReliableDate(minDay, maxDay));
	const containerHTML = useRef<HTMLDivElement>(null);
	const hoursHTML = useRef<HTMLDivElement>(null);

	const days = getDays(minDay, maxDay, date, columnsCount);

	const firstDate = new Date(days[0]);
	const lastDate = new Date(days[days.length - 1]);
	setStartOfDay(firstDate);
	setEndOfDay(lastDate);
	const monthDisplay = monthRangeString(firstDate, lastDate);

	const goNext = () => {
		setDate(getReliableDate(minDay, maxDay, forwardDays(date, columnsCount)));
	};
	const goBack = () => {
		setDate(
			getReliableDate(minDay, maxDay, forwardDays(date, -columnsCount), true)
		);
	};

	useLayoutEffect(() => {
		const { height } = getComputedStyle(hoursHTML.current as HTMLDivElement);

		const hourpx = parseFloat(height) / (maxHour - minHour);

		setHourHeight(hourpx);
	}, [maxHour, minHour]);

	useEffect(() => {
		const updateWidth = () => {
			const columsThatFit = Math.floor(
				(containerHTML.current?.clientWidth || 1) / columnWidth
			);
			const newCount = clamp(1, columsThatFit, 7);
			setColumsCount(newCount);
		};
		const debouncedUpdate = debounce(updateWidth);
		updateWidth();
		window.addEventListener('resize', debouncedUpdate);
		return () => {
			window.removeEventListener('resize', debouncedUpdate);
		};
	}, []);

	const groupedMeetings = groupMeetings(meetings, firstDate, lastDate);
	const firstDay = firstDate.getDay();
	const columns = days.map(d => (
		<Column
			hourHeight={hourHeight}
			dayName={getDayName(d.getDay(), true)}
			dayNumber={d.getDate()}
			key={d.getTime()}
			meetings={groupedMeetings[d.getDay() - firstDay]}
			minHour={minHour}
		/>
	));
	const hours: ReactNode[] = [];
	for (let i = minHour; i <= maxHour; i += hourStep)
		hours.push(
			<div className={styles.hour} key={i}>
				{i}
			</div>
		);
	return (
		<div className={styles.calendar} style={{ height: calendarHeight }}>
			<div className={styles['top-bar']}>
				<h2 className={styles.h}>Kalendarz</h2>
				<nav className={styles.buttons}>
					<Button className={styles.finger} onClick={goBack}>
						☚
					</Button>
					<Button className={styles.finger} onClick={goNext}>
						☛
					</Button>
				</nav>
				<p className={styles.month}>{monthDisplay}</p>
				<p className={styles.year}>{date.getFullYear()}</p>
			</div>
			<div className={styles.content}>
				<div className={styles['hours-tab']}>
					<h5 className={styles['h-label']}>godz</h5>
					<div className={styles.hours} ref={hoursHTML}>
						{hours}
					</div>
				</div>
				<div className={styles.days} ref={containerHTML}>
					{columns}
				</div>
			</div>
		</div>
	);
};

export default Calendar;
