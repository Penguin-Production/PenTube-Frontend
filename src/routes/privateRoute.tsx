import { Navigate, Outlet } from 'react-router-dom';

import { User } from '../utils/dto/user';
import { LocalStorageUtils } from '../utils/helper/localStorage';
import usePersistedState from '../utils/hooks/usePersistedState';

type props = {
	role: string;
};

// we may not use the role attribute
const PrivateRoute = (props: props) => {
	const token = LocalStorageUtils.getItem('token');

	if (token) {
		return <Outlet />;
	}
	return <Navigate to='/' />;
};

export default PrivateRoute;
