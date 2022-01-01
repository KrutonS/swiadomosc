import { FC, ReactNode, useLayoutEffect, useRef } from 'react';
import cn from 'classnames';
import { hourMs } from 'utils/date/msTimes';
import styles from 'styles/meetings/Calendar.module.scss';
import { Meeting } from 'types';
import dateToHour from 'utils/date/dateToHour';

//#region local types
interface ColumnProps {
	dayName: string;
	dayNumber: number;
	hourHeight: number;
	minHour: number;
	meetings?: Meeting[];
}
type CellProps = {
	children: ReactNode;
	height?: number;
	className?: string;
	topOffset?: number;
};
type MeetingCellProps = Meeting & Pick<ColumnProps, 'hourHeight' | 'minHour'>;
//#endregion

//#region local components
const Cell: FC<CellProps> = ({ children, height, className, topOffset }) => {
	const cellHTML = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (topOffset)
			cellHTML.current?.style.setProperty('--top-offset', `${topOffset}px`);
		if (height) cellHTML.current?.style.setProperty('--height', `${height}px`);
	}, [height, topOffset]);

	return (
		<div className={cn(styles.cell, className)} ref={cellHTML}>
			{children}
		</div>
	);
};
const Day = ({
	dayName,
	dayNumber,
}: Pick<ColumnProps, 'dayName' | 'dayNumber'>) => (
	<Cell>
		<div className={styles.day}>
			<small>{dayName}</small>
			<h3>{dayNumber}</h3>
		</div>
	</Cell>
);
const MeetingCell = ({
	name,
	startTime,
	length,
	hourHeight,
	minHour,
}: MeetingCellProps) => {
	const startDate = new Date(startTime);
	const endDate = new Date(startDate.getTime() + length * hourMs);

	const startString = dateToHour(startDate);
	const endString = dateToHour(endDate);
	// console.log({[name]:startDate.getHours() + startDate.getMinutes() / 60 - minHour, hours:startDate.getHours(), minutes:startDate.getMinutes()/60});

	const topOffset =
		(startDate.getHours() + startDate.getMinutes() / 60 - minHour) * hourHeight;

	return topOffset >= 0 ? (
		<Cell
			height={hourHeight * length}
			className={styles.meeting}
			topOffset={topOffset}
		>
			<p>
				<strong>{startString}</strong> - <small>{endString}</small>
			</p>
			<p className={styles['meeting-name']}>{name}</p>
		</Cell>
	) : null;
};
//#endregion

const Column = ({
	meetings,
	hourHeight,
	minHour,
	...dayProps
}: ColumnProps) => {
	return (
		<div className={styles.column}>
			<Day {...dayProps} />
			<div className={styles.meetings}>
				{meetings?.map(m => (
					<MeetingCell
						{...m}
						hourHeight={hourHeight}
						minHour={minHour}
						key={m.id}
					/>
				))}
			</div>
		</div>
	);
};

export default Column;
