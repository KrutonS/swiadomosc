import Router from 'next/router';
import { FC, useEffect } from 'react';

const Index: FC = () => {
	useEffect(() => {
		Router.push('/o-nas');
	});
	return null;
};

export default Index;
