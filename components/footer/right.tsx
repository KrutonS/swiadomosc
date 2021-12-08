import { FC } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../../styles/Footer.module.scss';
import Button from '../button';
import Input from '../input';

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

	// eslint-disable-next-line no-console
	const onSubmit = (data: FormData) => console.log(data);

	return (
		<form className={styles.right} onSubmit={handleSubmit(onSubmit)}>
			<h3>Chcesz nam coś powiedzieć?</h3>
			<Input
				className={styles.input}
				register={register}
				id="email"
				label="Twój email"
				type="email"
				options={{
					required:
						'Podaj proszę swój email, żebyśmy wiedzieli gdzie odpowiedzieć ;)',
					pattern: {
						value:
							/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
						message: 'Email jest nieprawidłowy!',
					},
				}}
				errorMessage={errors.email?.message}
			/>
			<Input
				multiLine
				className={styles.input}
				register={register}
				id="message"
				label="Wiadomość"
				options={{
					required: 'Wiadomość jest pusta!',
				}}
				errorMessage={errors.message?.message}
				placeholder="You have freedom here. The only guide is your heart."
			/>
			<Button type="submit">Wyślij</Button>
		</form>
	);
};

export default Right;
