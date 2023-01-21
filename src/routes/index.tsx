import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ErrorPage from '../pages/Error';
import Welcome from '../pages/Welcome';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';

const publicRoute = [
	{
		path: '',
		exact: true,
		component: <Welcome />,
	},
	{
		path: 'home',
		exact: true,
		component: <Welcome />,
	},
];

const privateRoute = [
	{
		role: 'user',
		// TODO: path and route just for testing, change it if needed
		routes: [{ path: '/user/home', exact: true, component: <Welcome /> }],
	},
	{
		role: 'admin',
		routes: [{ path: '', exact: true, component: <Welcome /> }],
	},
];
const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<PublicRoute />}>
				{publicRoute.map((route) => (
					<Route key={route.path} path={route.path} element={route.component} />
				))}
			</Route>
			{privateRoute.map((routeByRole) => (
				<Route
					key={routeByRole.role + '_route'}
					path='/'
					element={<PrivateRoute role={routeByRole.role} />}
				>
					{routeByRole.routes.map((route) => (
						<Route
							key={route.path + '_' + routeByRole.role}
							path={route.path}
							element={route.component}
						/>
					))}
				</Route>
			))}
			<Route path='*' key={'notFound'} element={<ErrorPage />}></Route>
		</Routes>
	);
};

export default Router;
