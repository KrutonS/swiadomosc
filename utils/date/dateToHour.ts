const dateToHour = (date: Date): string => {
	const hour = date.getHours();
	let minutes: string | number = date.getMinutes();
	if (minutes < 10) minutes = `0${minutes}`;
	return `${hour}:${minutes}`;
};

export default dateToHour;
