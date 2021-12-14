const MONTHS = [
	'styczeń',
	'luty',
	'marzec',
	'kwiecień',
	'maj',
	'czerwiec',
	'lipiec',
	'sierpień',
	'wrzesień',
	'październik',
	'listopad',
	'grudzień',
];
const SHORT_LENGTH = [3, 4, 4, 4, undefined, 5, 3, 4, 4, 5, 4, 5];
const getMonthName = (i: number, short?: boolean) =>
	short ? MONTHS[i].slice(0, SHORT_LENGTH[i]) : MONTHS[i];
export default getMonthName;
