export type UArray = Array<unknown>;
// eslint-disable-next-line no-unused-vars
export type FArgs<P extends UArray> = (...args: P) => void;
