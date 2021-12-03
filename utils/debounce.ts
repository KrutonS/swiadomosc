import { FArgs, UArray } from '../types';

export default <P extends UArray>(f: FArgs<P>, timeout = 300) => {
	let timer: number;
	return (...args: P) => {
		window.clearTimeout(timer);
		timer = window.setTimeout(() => {
			f.apply(this, args);
		}, timeout);
	};
};
