import cn from 'classnames';
import { Dispatch, FC, SetStateAction } from 'react';
import styles from 'styles/Select.module.scss';
import { buttonClick } from 'utils/accessibleClick';
import Button from './button';

interface Props {
	active: string | null;
	setActive: Dispatch<SetStateAction<string | null>>;
	options: string[];
	label: string;
	noActiveText?: string;
	className?: string;
	onRight?: boolean;
}

type OptionProps = {
	index: number;
	isActive?: boolean;
	children: string;
	setActive: Props['setActive'];
};
const Option: FC<OptionProps> = ({ children, isActive, setActive }) => {
	// 	const ref = useRef<HTMLLIElement>(null);
	// 	useLayoutEffect(() => {
	// 		ref.current?.style.setProperty('--index', `${index}`);
	// 	}, [index]);
	return (
		<li
			className={cn(styles.option, styles.cell, {
				[styles['option--active']]: isActive,
			})}
			// ref={ref}
		>
			<Button
				{...buttonClick(() => setActive(isActive ? null : children))}
				// ref={ref as Ref<HTMLButtonElement>}
			>
				{children}
			</Button>
		</li>
	);
};
const Select = ({
	active,
	label,
	options,
	setActive,
	noActiveText,
	className,
	onRight,
}: Props) => {
	const optionsJSX = options.map((o, i) => (
		<Option index={i} isActive={o === active} setActive={setActive} key={o}>
			{o}
		</Option>
	));
	// const [show, setShow] = useState(false);

	return (
		<div
			className={cn(
				styles.select,
				{ [styles['select--right']]: onRight },
				className
				// { [styles['select--show']]: show,}
			)}
		>
			{/* <div
				className={styles.header}
				// onClick={() => setShow(!show)}
			> */}
			<div className={styles.label}>{label}</div>
			<div className={cn(styles['display-option'], styles.cell)}>
				{active || noActiveText || '-'}
			</div>
			{/* </div> */}
			<ul className={styles['options-list']}>{optionsJSX}</ul>
		</div>
	);
};

export default Select;
