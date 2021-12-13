// eslint-disable-next-line no-unused-vars
type Clamp = (min: number, value: number, max: number) => number;

const clamp: Clamp = (min, value, max) => Math.min(max, Math.max(min, value));

export default clamp;
