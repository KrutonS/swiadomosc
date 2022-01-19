import { UserCredential } from 'firebase/auth';
import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useMemo,
	useState,
} from 'react';

type User = UserCredential['user'];
type SetUser = Dispatch<SetStateAction<User | undefined>>;
export type UserState = { user?: User; setUser: SetUser };
export const userContext = createContext<UserState>({
	setUser: (_: unknown) => _,
});
export const UserProvider: FC = ({ children }) => {
	const [user, setUser] = useState<User | undefined>();
	const state = useMemo(() => ({ user, setUser }), [user, setUser]);
	return <userContext.Provider value={state}>{children}</userContext.Provider>;
};

export const useUser = (): [User | undefined, SetUser] => {
	const { setUser, user } = useContext(userContext);
	return [user, setUser];
};
