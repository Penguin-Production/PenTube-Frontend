import { Navigate, Outlet } from 'react-router-dom';

import useUserStore from '../storage/useUserStore';

type props = {
	role: string;
};

// we may not use the role attribute
const PrivateRoute = (props: props) => {
	const { user } = useUserStore();
	if (user) {
		return <Outlet />;
	}
	return <Navigate to='/' />;
};

export default PrivateRoute;
