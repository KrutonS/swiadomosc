import { FC } from 'react';
import { AddressType } from '../../types';

const Address: FC<AddressType> = ({ street, zip, city }) => (
	<>
		<div>{city}</div>
		<div>ul. {street}</div>
		<div>{zip}</div>
	</>
);
export default Address;
