const DAYS = [
	'niedziela',
	'poniedziałek',
	'wtorek',
	'środa',
	'czwartek',
	'piątek',
	'sobota',
];
const DAYS_SHORT = ['niedz', 'pon', 'wt', 'śr', 'czw', 'pt', 'sob'];

const getDayName = (i: number, short?: boolean) =>
	short ? DAYS_SHORT[i] : DAYS[i];

export default getDayName;
