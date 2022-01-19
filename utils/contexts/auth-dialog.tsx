import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useMemo,
	useState,
} from 'react';

type SetShow = Dispatch<SetStateAction<boolean>>;
type AuthDialogState = { show?: boolean; setShow: SetShow };

export const authDialogContext = createContext<AuthDialogState>({
	setShow: (_: unknown) => _,
});
export const AuthDialogProvider: FC = ({ children }) => {
	const [show, setShow] = useState(false);
	const state = useMemo(() => ({ show, setShow }), [show, setShow]);
	return (
		<authDialogContext.Provider value={state}>
			{children}
		</authDialogContext.Provider>
	);
};

export const useAuthDialog = (): [boolean | undefined, SetShow] => {
	const { show, setShow } = useContext(authDialogContext);
	return [show, setShow];
};
