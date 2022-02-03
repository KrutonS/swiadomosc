import { FieldValues } from 'react-hook-form';
import { FieldsNotTheSameError } from 'utils/errors';
import Input, { InputProps } from './input';

export type CompareInputsFrom<T> = T &
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Partial<Record<`compare ${Extract<keyof T, string>}`, any>>;

type Props<T extends FieldValues> = InputProps<T>;

export const InputCompare = <T extends FieldValues>({
	id,
	label,
	errors,
	options,
	required = true,
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
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				id={comparerKey as any}
				label={`Powtórz ${label.toLowerCase()}`}
				errors={errors && errors[comparerKey]}
				required={required}
				autoComplete="off"
			/>
		</>
	);
};

export function checkCompares<T extends FieldValues>(data: T): void {
	Object.keys(data).forEach(key => {
		const compare = data[key];
		const compareToKey = `compare ${key}`;
		const compareTo = data[compareToKey];

		if (compareTo !== undefined && compare !== compareTo)
			throw new FieldsNotTheSameError(compareToKey);
	});
}
