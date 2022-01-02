import { FC } from 'react';
import { Contact } from 'types';
import Head from 'next/head';
import { renderMetaTags, ToMetaTagsType } from 'react-datocms';
import Header from './header';
import Footer from './footer';

interface Props extends Contact {
	seoData: ToMetaTagsType;
}

const Layout: FC<Props> = ({ contact, children, seoData }) => {
	return (
		<>
			<Head>
				{/* <link rel="icon" href="/logo.svg" /> */}
				{renderMetaTags(seoData)}
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
