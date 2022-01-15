import { UserProvider } from 'lib/user-context';
import { AppProps } from 'next/app';
import '../styles/globals.scss';

function App({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<Component {...pageProps} />
		</UserProvider>
	);
}
export default App;
