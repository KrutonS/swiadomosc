import { FC } from 'react';
import { Contact } from '../../types';

const Address: FC<Pick<Contact['contact'], 'street' | 'zip' | 'city'>> = ({
	street,
	zip,
	city,
}) => (
	<>
		<div>{city}</div>
		<div>ul. {street}</div>
		<div>{zip}</div>
	</>
);
export default Address;
