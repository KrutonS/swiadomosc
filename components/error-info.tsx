import cn from 'classnames';
import classes from '../styles/error-info.module.scss';

type Props = { children?: string | null; clearPos?: boolean };

const ErrorInfo = ({
	children = 'Coś poszło nie tak przy generowaniu strony :/',
	clearPos,
}: Props) => (
	<h3 className={cn(classes.ErrorInfo, !clearPos && classes.center)}>
		{children}
	</h3>
);

export default ErrorInfo;
