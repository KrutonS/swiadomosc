import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
// import { useRouter } from 'next/dist/client/router';
import Header from '../components/header';

function App({ Component, pageProps }: AppProps) {
	// const { pathname } = useRouter();
	// console.log(pathname);
	return (
		<>
			<Header />
			<Component {...pageProps} />
			<Head>
				<link rel="icon" href="/logo.svg" />
			</Head>
		</>
	);
}

export default App;
