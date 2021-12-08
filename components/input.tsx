import {
	HTMLInputTypeAttribute,
	InputHTMLAttributes,
	TextareaHTMLAttributes,
} from 'react';
import {
	FieldPath,
	FieldPathValue,
	FieldValues,
	RegisterOptions,
	UnpackNestedValue,
	UseFormRegister,
} from 'react-hook-form';
import styles from '../styles/Input.module.scss';
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
interface Props<F extends FieldValues> {
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
	errorMessage?: string;
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
	errorMessage,
}: Props<F>) => {
	type CommonAttr = InputHTMLAttributes<HTMLInputElement> &
		TextareaHTMLAttributes<HTMLTextAreaElement>;
	// required: !!options?.required,

	const commonAttr: CommonAttr = {
		className: `${styles.input} ${className}`,
		id,
		'aria-invalid': !!errorMessage,
		disabled: options?.disabled,
		required: !!options?.required,
		placeholder,
		...register(id, options),
	};
	return (
		<div className={styles.container}>
			<label className="" htmlFor={id}>
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
			{errorMessage && (
				<p role="alert" className={`${styles.error} error`}>
					{errorMessage}
				</p>
			)}
		</div>
	);
};

export default Input;
