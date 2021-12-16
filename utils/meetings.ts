import { Meeting } from 'types';

// export function meetingsByWeekly(meetings: Meeting[]): GroupedMeetings {
// 	// const weekly = meetings.filter(m => m.weekly);
// 	const weeklies: Meeting[] = [];
// 	const singles: Meeting[] = [];
// 	meetings.forEach(m => (m.weekly ? weeklies.push(m) : singles.push(m)));
// 	return { weeklies, singles };
// }

export function groupMeetings(
	meetings: Meeting[],
	minDate: Date,
	maxDate: Date
): Meeting[][] {
	const minDay = minDate.getDay();
	const maxDay = maxDate.getDay();
	// console.log(minDay, maxDay,maxDay - minDay + 1);
	const result: Meeting[][] = Array.from(
		{ length: maxDay - minDay + 1 },
		() => []
	);
	// console.log(result);

	// for(let i=0; i<=maxDay; i++) result[i]
	meetings.forEach(m => {
		// meetings.weeklies.forEach(w => {
		const { startTime } = m;
		const meetingDate = new Date(startTime);
		const dayIndex = meetingDate.getDay() - minDay;

		if (m.weekly) {
			// if (dayIndex >= 0 && dayIndex <= maxDay) result[dayIndex].push(m);
			if (result[dayIndex] instanceof Array) result[dayIndex].push(m);
		} else if (meetingDate >= minDate && meetingDate <= maxDate)
			result[dayIndex].push(m);
	});

	return result;
}
