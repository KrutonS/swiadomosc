import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
// import { useRouter } from 'next/dist/client/router';
import Header from '../components/header';
// import ScrollContextWrapper from '../utils/global-context/scrollContext';

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<link rel="icon" href="/logo.svg" />
			</Head>
			<Header />
			{/* <ScrollContextWrapper> */}
			<Component {...pageProps} />
			{/* </ScrollContextWrapper> */}
		</>
	);
}

export default App;
