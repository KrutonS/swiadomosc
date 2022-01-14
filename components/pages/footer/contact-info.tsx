import { Contact } from 'types';
import styles from 'styles/Footer.module.scss';

type Props = Pick<Contact['contact'], 'phone' | 'email'>;

const ContactInfo = ({ email, phone }: Props) => {
	if (email || phone)
		return (
			<div className={styles.contact}>
				<h5>kontakt</h5>
				{phone && <p>{phone}</p>}
				{email && <p className={styles.email}>{email}</p>}
			</div>
		);
	return null;
};

export default ContactInfo;
