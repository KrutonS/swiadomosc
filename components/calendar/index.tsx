import {
	FC,
	ReactNode,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import dayRange from '../../utils/date/dayRange';
import getMonthName from '../../utils/date/monthNames';
import debounce from '../../utils/debounce';
import Button from '../button';
import Column from './column';
import getDayName from '../../utils/date/dayName';
import styles from '../../styles/Calendar.module.scss';
import clamp from '../../utils/math/clamp';
import forwardDays from '../../utils/date/forwardDays';
// import { GetStaticProps } from 'next';
// #region Locals
const minHour = 8;
const maxHour = 22;
const hourStep = 2;
const columnWidth = 220;
const minDay = 1;
const maxDay = 5;

const getReliableDate = (date = new Date(), inverse = false): Date => {
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

const hours: ReactNode[] = [];
for (let i = minHour; i <= maxHour; i += hourStep)
	hours.push(
		<div className={styles.hour} key={i}>
			{i}
		</div>
	);

//#endregion

const Calendar: FC = () => {
	const [columnsCount, setColumsCount] = useState(1);
	const [hourHeight, setHourHeight] = useState(1);
	const [date, setDate] = useState(getReliableDate());
	const containerHTML = useRef<HTMLDivElement>(null);
	const hoursHTML = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const { rowGap, height } = getComputedStyle(
			hoursHTML.current as HTMLDivElement
		);
		setHourHeight((parseFloat(rowGap) + parseFloat(height) / 2) / hourStep);
	}, []);

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

	let days;
	const daysCount = maxDay - minDay;
	if (columnsCount >= daysCount) days = dayRange(date, minDay, maxDay);
	else {
		const currentDay = date.getDay();
		const min = Math.floor(currentDay / columnsCount) * columnsCount;
		const max = min + columnsCount - 1;
		days = dayRange(date, min, max);
	}

	const columns = days.map(d => (
		<Column
			hourHeight={hourHeight}
			dayName={getDayName(d.getDay(), true)}
			dayNumber={d.getDate()}
		/>
	));

	const goNext = () => {
		setDate(getReliableDate(forwardDays(date, columnsCount)));
	};
	const goBack = () => {
		setDate(getReliableDate(forwardDays(date, -columnsCount), true));
	};

	return (
		<div className={styles.calendar}>
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
				<p className={styles.month}>{getMonthName(date.getMonth())}</p>
				<p className={styles.year}>{date.getFullYear()}</p>
			</div>
			<div className={styles.content}>
				<div className={styles.hours} ref={hoursHTML}>
					<h5 className={styles['h-label']}>godz</h5>
					{hours}
				</div>
				{/* eslint-disable-next-line react/self-closing-comp */}
				<div className={styles.days} ref={containerHTML}>
					{columns}
				</div>
			</div>
		</div>
	);
};

export default Calendar;

// eslint-disable-next-line no-unused-vars
// export async const getStaticProps:GetStaticProps = (context) => {

// }
