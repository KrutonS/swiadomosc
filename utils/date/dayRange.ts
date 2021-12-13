// import forwardDays from './forwardDays';
import forwardDays from './forwardDays';

export default function dayRange(
	currentDate: Date,
	minDay: number,
	maxDay: number
) {
	const result: Date[] = [];
	const rotatedMax = maxDay < minDay ? maxDay + 7 : maxDay;
	for (let offset = minDay; offset <= rotatedMax; offset++) {
		const newDate = forwardDays(currentDate, offset - currentDate.getDay());
		result.push(newDate);
	}
	return result;
}
