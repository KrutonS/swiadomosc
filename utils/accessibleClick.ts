import {
	AriaRole,
	KeyboardEvent,
	KeyboardEventHandler,
	MouseEvent,
	MouseEventHandler,
} from 'react';

type OnClick = (e: MouseEvent | KeyboardEvent) => void;

type KeysFilter = { whitelist?: string[]; blacklist?: string[] };
type AccessibleClick = (
	onClick: OnClick,
	role?: AriaRole,
	keys?: KeysFilter
) => {
	onClick: MouseEventHandler;
	onKeyDown: KeyboardEventHandler;
	role: AriaRole;
};

const accessibleClick: AccessibleClick = (
	onClick,
	role = 'button',
	keys = { whitelist: undefined, blacklist: ['Tab'] }
) => {
	const { whitelist, blacklist } = keys;
	const onKeyDown: KeyboardEventHandler = e => {
		const { key } = e;
		const arrayIncludes = (arr?: string[]) => arr?.includes?.(key);
		if (arrayIncludes(whitelist) && !arrayIncludes(blacklist))
			onClick(e as Parameters<OnClick>[0]);
	};
	return { onClick, onKeyDown, role, tabIndex: 0 };
};
export default accessibleClick;

export const buttonClick = (onClick: Parameters<AccessibleClick>[0]) =>
	accessibleClick(onClick, undefined, { whitelist: ['Space'] });
