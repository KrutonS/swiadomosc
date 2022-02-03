import { useEffect } from 'react';
import { applyActionCode } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from 'lib/firebase';
import { useAsync } from 'utils/hooks/async';
import styles from 'styles/Verify.module.scss';
import Spinner from 'components/spinner';

const handleVerify = async (code: string):Promise<string> => {
	await applyActionCode(auth, code);
	return 'Twój email został potwierdzony! Możesz się teraz zalogować.';
};

const ActionPage = () => {
	const { query } = useRouter();
	const { data: message, handler: verify, loading, error } = useAsync(handleVerify);

	useEffect(() => {
		if ('oobCode' in query && typeof query.oobCode === 'string')
			verify(query.oobCode);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	return (
		<main className={styles.main}>
			<div className={styles.dialog}>
				{loading && <Spinner />}
				{message && <h4 className='success'>{message}</h4>}
				{error && <h5 className="error">{error}</h5>}
			</div>
		</main>
	);
};

export default ActionPage;
