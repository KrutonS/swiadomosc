const numberToHour = (num: number): string => {
	const hour = Math.floor(num);
	let min: string | number = Math.floor(num - hour * 60);
	if (min < 10) min = `0${min}`;
	return `${hour}:${min}`;
};

export default numberToHour;
