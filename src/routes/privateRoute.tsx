import { Navigate, Outlet } from 'react-router-dom';

import { User } from '../utils/dto/user';
import usePersistedState from '../utils/hooks/usePersistedState';

type props = {
	role: string;
};

// we may not use the role attribute
const PrivateRoute = (props: props) => {
	const { role } = props;
	const [user, setUser] = usePersistedState<User>('user', {} as User);
	if (user.role === role) {
		return <Outlet />;
	}
	return <Navigate to='/' />;
};

export default PrivateRoute;
