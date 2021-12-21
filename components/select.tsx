import cn from 'classnames';
import {
	Dispatch,
	memo,
	ReactElement,
	SetStateAction,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { Option } from 'types';
import accessibleClick from 'utils/accessibleClick';

interface Props {
	label: string;
	noChoiceText?: string;
	options: Option[];
	selected: Option;
	setSelected: Dispatch<SetStateAction<Option>>;
	className?: string;
}
const Select = memo<Props>(
	({
		options,
		label,
		selected,
		setSelected,
		className,
		noChoiceText,
	}): ReactElement => {
		const [show, setShow] = useState(false);
		const toggle = () => setShow(!show);
		const accessibleToggle = accessibleClick(toggle);
		const containerRef = useRef<HTMLElement>(null);
		const onFocus = () => {
			if (!show) setShow(true);
		};
		useLayoutEffect(() => {
			const containerHtml = containerRef.current;
			const onFocusOut = () => {
				setShow(false);
			};
			(containerHtml as HTMLElement).addEventListener('focusout', onFocusOut);
			return () => {
				(containerHtml as HTMLElement).removeEventListener(
					'focusout',
					onFocusOut
				);
			};
		}, []);
		const onBlur = () => {
			if (show) setShow(false);
		};
		// const onClick = (option: Option) => setSelected(option);

		return (
			<nav
				onFocus={onFocus}
				className={cn('dropdown-container', className)}
				ref={containerRef}
				onBlurCapture={onBlur}
			>
				<span className="dropdown-label" role="button" tabIndex={0}>
					{label}
				</span>
				<div className="dropdown-header dropdown-cell">
					{selected?.label || noChoiceText || '-'}
				</div>
				<div className="dropdown-list-wrapper">
					<ul className={cn('dropdown-list', { 'dropdown-list--show': show })}>
						{options.map(o => (
							<li
								key={o.value}
								className={cn('dropdown-item dropdown-cell', {
									'dropdown-item--selected': selected === o,
								})}
								{...accessibleClick(() => setSelected(o))}
							>
								{o.label}
							</li>
						))}
					</ul>
				</div>
			</nav>
		);
	}
);

export default Select;
