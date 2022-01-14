import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { emailRegex } from 'utils/globals';

import styles from 'styles/Footer.module.scss';
import Button from 'components/user-inputs/button';
import Input from 'components/user-inputs/input';

interface FormData {
	email: string;
	message: string;
}

const Right: FC = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FormData>();
	//
	// eslint-disable-next-line no-console
	const onSubmit = (data: FormData) => console.log(data); // TODO make this work dang it

	return (
		<form className={styles.right} onSubmit={handleSubmit(onSubmit)}>
			<h4>Chcesz nam coś powiedzieć?</h4>
			<Input
				className={styles.input}
				register={register}
				id="email"
				label="Twój email"
				type="email"
				options={{
					pattern: {
						value: emailRegex,
						message: 'Email jest nieprawidłowy!',
					},
				}}
				errors={errors.email}
			/>
			<Input
				multiLine
				className={styles.input}
				register={register}
				id="message"
				label="Wiadomość"
				// options={{
				// 	required: 'Wiadomość jest pusta!',
				// }}
				required
				errors={errors.message}
				placeholder="You have freedom here. The only guide is your heart."
			/>
			<Button type="submit" className={styles.button}>
				Wyślij
			</Button>
		</form>
	);
};

export default Right;
