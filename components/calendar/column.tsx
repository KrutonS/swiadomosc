import { FC, ReactNode, useLayoutEffect, useRef } from 'react';
import cn from 'classnames';
import styles from '../../styles/Calendar.module.scss';
import { Meeting } from '../../types';
import numberToHour from '../../utils/date/numberToHour';

//#region local types
interface ColumnProps {
	dayName: string;
	dayNumber: number;
	hourHeight: number;
	meetings?: Meeting[];
}
type CellProps = {
	children: ReactNode;
	height?: number;
	className?: string;
	topOffset?: number;
};
type MeetingCellProps = Meeting & Pick<ColumnProps, 'hourHeight'>;
//#endregion

//#region local components
const Cell: FC<CellProps> = ({ children, height, className, topOffset }) => {
	const cellHTML = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (topOffset)
			cellHTML.current?.style.setProperty('--top-offset', `${topOffset}px`);
	}, [topOffset]);

	return (
		<div
			className={cn(styles.cell, className)}
			style={{ height }}
			ref={cellHTML}
		>
			{children}
		</div>
	);
};

const Day = ({
	dayName,
	dayNumber,
}: Omit<ColumnProps, 'meetings' | 'hourHeight'>) => (
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
}: MeetingCellProps) => {
	const endTime = startTime + length;

	const startHour = numberToHour(startTime);
	const endHour = numberToHour(endTime);

	return (
		<Cell height={hourHeight * length} className={styles.meeting}>
			<p>
				<strong>{startHour}</strong> - <small>{endHour}</small>
			</p>
			<p className={styles['meeting-name']}>{name}</p>
		</Cell>
	);
};
//#endregion

const Column = ({ meetings, hourHeight, ...dayProps }: ColumnProps) => {
	return (
		<div className={styles.column}>
			<Day {...dayProps} />
			{meetings?.map(m => (
				<MeetingCell {...m} hourHeight={hourHeight} />
			))}
		</div>
	);
};

export default Column;
