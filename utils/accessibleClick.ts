// const defaultKeyFilter = ({ key }) => {
//   const ignoreKeys = ["Tab"];
//   return ignoreKeys.includes(key);

import {
	AriaRole,
	KeyboardEvent,
	KeyboardEventHandler,
	MouseEvent,
} from 'react';

// };
type OnClick = (
	e:
		| MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
		| KeyboardEvent<Element>
) => void;
type KeysFilter = { whitelist?: string[]; blacklist?: string[] };
type AccessibleClick = (
	onClick: OnClick,
	role: AriaRole,
	keys: KeysFilter
) => { onClick: OnClick; onKeyDown: KeyboardEventHandler; role: AriaRole };
const accessibleClick: AccessibleClick = (
	onClick,
	role = 'button',
	keys = { whitelist: undefined, blacklist: ['Tab'] }
) => {
	const { whitelist, blacklist } = keys;
	const onKeyDown: KeyboardEventHandler = e => {
		const { key } = e;
		const arrayIncludes = (arr?: string[]) => arr?.includes?.(key);
		if (arrayIncludes(whitelist) || !arrayIncludes(blacklist)) onClick(e);
	};
	return { onClick, onKeyDown, role, tabIndex: 0 };
};
export default accessibleClick;
