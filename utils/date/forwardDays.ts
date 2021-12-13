import { dayMs } from './msTimes';

const forwardDays = (date: Date, days: number): Date =>
	new Date(date.getTime() + days * dayMs);

export default forwardDays;
