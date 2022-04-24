import { UserProvider } from 'utils/contexts/user';
import { AppProps } from 'next/app';
import { AuthDialogProvider } from 'utils/contexts/auth-dialog';
import { ToastContainer } from 'react-toastify';
import '../styles/globals.scss';

function App({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<AuthDialogProvider>
				<ToastContainer limit={3} />
				<Component {...pageProps} />
			</AuthDialogProvider>
		</UserProvider>
	);
}
export default App;
