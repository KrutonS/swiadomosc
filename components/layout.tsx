import { FC } from 'react';
import { Contact } from 'types';
import Head from 'next/head';
import Header from './header';
import Footer from './footer';

type Props = Contact;

const Layout: FC<Props> = ({ contact, children }) => {
	return (
		<>
			<Head>
				<link rel="icon" href="/logo.svg" />
			</Head>
			<Header />
			{/* <ScrollContextWrapper> */}
			{children}
			{/* </ScrollContextWrapper> */}
			<Footer contact={contact} />
		</>
	);
};

export default Layout;
