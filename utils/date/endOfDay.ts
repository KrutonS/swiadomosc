function setEndOfDay(date: Date) {
	date.setHours(23);
	date.setMinutes(59);
	date.setSeconds(59);
	date.setMilliseconds(999);
}

export default setEndOfDay;
