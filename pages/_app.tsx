import { UserProvider } from 'utils/contexts/user';
import { AppProps } from 'next/app';
import { AuthDialogProvider } from 'utils/contexts/auth-dialog';
import '../styles/globals.scss';

function App({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<AuthDialogProvider>
				<Component {...pageProps} />
			</AuthDialogProvider>
		</UserProvider>
	);
}
export default App;
