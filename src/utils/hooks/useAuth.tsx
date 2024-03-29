import { createContext, useEffect } from 'react';

import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import usePersistedState from './usePersistedState';

export const authContext = createContext<string>('');

type Props = {
	children: React.ReactNode;
};
const Auth = (props: Props) => {
	const { children } = props;
	const [searchParams, setSearchParams] = useSearchParams();
	const [token, setToken] = usePersistedState<string>('token');
	const [refreshToken, setRefreshToken] = usePersistedState<string>('refreshToken');

	useEffect(() => {
		const tokenParam = searchParams.get('token');
		const refreshTokenParam = searchParams.get('refreshToken');

		if (tokenParam && refreshTokenParam) {
			setToken(tokenParam);
			setRefreshToken(refreshTokenParam);
			// searchParams.delete('token');
			// searchParams.delete('refreshToken');
			// setSearchParams(searchParams);
			window.location.href = '/';
		}
	}, [location]);
	return <authContext.Provider value={token}>{children}</authContext.Provider>;
};

export default Auth;
