import {
	HTMLInputTypeAttribute,
	InputHTMLAttributes,
	TextareaHTMLAttributes,
} from 'react';
import {
	FieldError,
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
export interface InputProps<F extends FieldValues> {
	label: string;
	multiLine?: boolean;
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

	register: UseFormRegister<F>;
	id: FieldPath<F>;
	options?: RegisterOptions<F>;
	defaultValue?: UnpackNestedValue<FieldPathValue<F, FieldPath<F>>>;
	// errorMessage?: string;
	errors?: FieldError;
	required?: boolean;
}

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
	// errorMessage,
	errors,
	required,
}: InputProps<F>) => {
	type CommonAttr = InputHTMLAttributes<HTMLInputElement> &
		TextareaHTMLAttributes<HTMLTextAreaElement>;
	// required: !!options?.required,
	const hasErrors = Boolean(Object.keys(errors || {}).length);

	const errorMessage =
		errors?.message || getDefaultInputErr(errors?.type, options);
	const commonAttr: CommonAttr = {
		className: `${styles.input} ${className}`,
		id,
		'aria-invalid': hasErrors,
		disabled: options?.disabled,
		required: !!options?.required || required,
		placeholder,
		...register(id, { ...options, required: required || options?.required }),
	};
	return (
		<div className={styles.container}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			{multiLine ? (
				<textarea className={styles.input} {...commonAttr}>
					{defaultValue}
				</textarea>
			) : (
				<input
					className={styles.input}
					{...commonAttr}
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
