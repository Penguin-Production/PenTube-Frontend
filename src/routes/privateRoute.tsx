import { Navigate, Outlet } from 'react-router-dom';

import { LocalStorageUtils } from '../utils/helper/localStorage';

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
