import { FieldValues, UseFormSetError } from 'react-hook-form';
import Input, { InputProps } from './input';

export type MergeWithCompare<T> = T &
	Partial<Record<`compare ${Extract<keyof T, string>}`, any>>;

type Props<T extends FieldValues> = InputProps<T>;

export const InputCompare = <T extends FieldValues>({
	id,
	label,
	errors,
	required,
	options,
	...passProps
}: Props<T>) => {
	const comparerKey = `compare ${id}`;

	return (
		<>
			<Input
				{...passProps}
				id={id}
				label={label}
				errors={errors && errors[id]}
				required={required}
				options={options}
			/>
			<Input
				{...passProps}
				id={comparerKey as any}
				label={`Powtórz ${label.toLowerCase()}`}
				errors={errors && errors[comparerKey]}
				autoComplete="off"
			/>
		</>
	);
};

export function checkCompares<T extends FieldValues>(
	data: T,
	setError: UseFormSetError<T>
): boolean {
	let isValid = true;
	Object.keys(data).forEach(key => {
		const compare = data[key];
		const compareToKey = `compare ${key}`;
		const compareTo = data[compareToKey];
		if (compare !== compareTo && compareTo !== undefined) {
			isValid = false;
			setError(compareToKey as any, {
				message: 'Pola nie są takie same!',
				type: 'compare',
			});
		}
	});
	return isValid;
}
