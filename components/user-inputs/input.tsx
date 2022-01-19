import {
	HTMLInputTypeAttribute,
	InputHTMLAttributes,
	TextareaHTMLAttributes,
} from 'react';
import {
	FieldErrors,
	FieldPath,
	FieldPathValue,
	FieldValues,
	RegisterOptions,
	UnpackNestedValue,
	UseFormRegister,
} from 'react-hook-form';
import getDefaultInputErr from 'utils/error/inputDefaultErrors';
import styles from 'styles/Input.module.scss';
/*
| 'button'
| 'checkbox'
| 'color'
| 'date'
| 'datetime-local'
| 'email'
| 'file'
| 'hidden'
| 'image'
| 'month'
| 'number'
| 'password'
| 'radio'
| 'range'
| 'reset'
| 'search'
| 'submit'
| 'tel'
| 'text'
| 'time'
| 'url'
| 'week'
*/
type InputAttributes = InputHTMLAttributes<HTMLInputElement>;
type TextAreaAttributes = TextareaHTMLAttributes<HTMLTextAreaElement>;

type SingleInputProps = {
	multiLine?: false;
} & InputAttributes;

type TextAreaProps = {
	multiLine: true;
} & TextAreaAttributes;

export type InputProps<F extends FieldValues> = {
	label: string;
	register: UseFormRegister<F>;
	id: FieldPath<F>;
	type?: Exclude<
		HTMLInputTypeAttribute,
		| 'button'
		| 'checkbox'
		| 'color'
		| 'file'
		| 'image'
		| 'radio'
		| 'range'
		| 'reset'
		| 'submit'
	>;
	className?: string;
	placeholder?: string;
	options?: RegisterOptions<F>;
	defaultValue?: UnpackNestedValue<FieldPathValue<F, FieldPath<F>>>;
	errors?: FieldErrors;
	required?: boolean;
} & (SingleInputProps | TextAreaProps);

const Input = <F extends FieldValues>({
	id,
	label,
	placeholder,
	type = 'text',
	className = '',
	multiLine,
	register,
	options,
	defaultValue,
	errors,
	required,
	...otherProps
}: InputProps<F>) => {
	const hasErrors = Boolean(Object.keys(errors || {}).length);

	const errorMessage =
		errors?.message || getDefaultInputErr(errors?.type, options);
	const commonAttr = {
		className: `${styles.input} ${className}`,
		id,
		'aria-invalid': hasErrors,
		disabled: options?.disabled,
		required: !!options?.required || required,
		placeholder,
		...register(id, { ...options, required: required || options?.required }),
		...otherProps,
	};

	return (
		<div className={styles.container}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			{multiLine ? (
				<textarea
					{...(commonAttr as TextAreaAttributes)}
					className={styles.input}
				>
					{defaultValue}
				</textarea>
			) : (
				<input
					{...(commonAttr as InputAttributes)}
					className={styles.input}
					defaultValue={defaultValue}
					type={type}
				/>
			)}
			{hasErrors ? (
				<p role="alert" className={`${styles.error} error`}>
					{errorMessage}
				</p>
			) : (
				<br />
			)}
		</div>
	);
};

export default Input;
