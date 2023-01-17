import { useState } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import Welcome from '../pages/Welcome';
import { User } from '../utils/dto/user';
import usePersistedState from '../utils/hooks/usePersistedState';

type props = {
	role: string;
};
const privateRoute = ({ role }: props) => {
	const [user, setUser] = usePersistedState<User>('user', {} as User);
	if (user.role === role) {
		return <Outlet />;
	}
	return <Navigate to='/' />;
};

export default privateRoute;
