import { FirebaseError } from 'firebase/app';
import { useEffect, useState } from 'react';
import {
	FieldValues,
	UseFormSetError,
	Path,
	useWatch,
	Control,
} from 'react-hook-form';
import { FirebaseErrors, FormError, getErrorMessage } from 'utils/errors';

export const useFormError = <F extends FieldValues>(
	onError: UseFormSetError<F>,
	errorsToInputs: Partial<Record<FirebaseErrors, Path<F>>>,
	control: Control<F>,
	shouldFocus?: boolean
) => {
	const [generalError, setGeneralError] = useState<string>();
	const values = useWatch({ control });

	const refreshError = () => {
		if (generalError) setGeneralError(undefined);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(refreshError, [values]);

	const errorHandler = (e: unknown) => {
		const message = getErrorMessage(e);
		let field: null | Path<F> = null;
		if (e instanceof FormError && e.field) {
			field = e.field as Path<F>;
			// setError(field, { message });
		} else if (
			e instanceof FirebaseError &&
			errorsToInputs &&
			errorsToInputs[e.code as FirebaseErrors]
		) {
			field = errorsToInputs[e.code as FirebaseErrors] as Path<F>;
		}
		if (field)
			onError(field, { message }, shouldFocus ? { shouldFocus } : undefined);
		else setGeneralError(message);
	};

	return { generalError, errorHandler, refreshError };
};
