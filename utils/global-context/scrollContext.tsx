/* eslint-disable import/prefer-default-export */
import { createContext, FC, ReactNode, useEffect, useRef } from 'react';
import debounce from '../debounce';

export const scrollContext = createContext<number>(0);
const { Provider: ScrollProvider } = scrollContext;
interface Props {
	children: ReactNode;
}

const ScrollContext: FC<Props> = ({ children }) => {
	const scrollValue = useRef(0);
	useEffect(() => {
		const updateScroll = debounce(() => {
			scrollValue.current = window.scrollY;
		});
		window.addEventListener('scroll', updateScroll);
		return () => {
			window.removeEventListener('scroll', updateScroll);
		};
	}, []);
	return (
		<ScrollProvider value={scrollValue.current}>{children}</ScrollProvider>
	);
};

export default ScrollContext;
