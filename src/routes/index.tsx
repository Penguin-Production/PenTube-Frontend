import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import ErrorPage from '../pages/Error';
import HomePage from '../pages/Home';
import SearchPage from '../pages/Search';
import WatchVideo from '../pages/Watch';
import Welcome from '../pages/Welcome';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';

import { StringMap } from 'i18next';

const publicRoute: Array<Record<string, any>> = [
	{
		path: '',
		exact: true,
		component: <HomePage />,
	},
	{
		path: 'watch/:id',
		exact: true,
		component: <WatchVideo />,
	},
	// {
	// 	path: 'home',
	// 	exact: true,
	// 	component: <Welcome />,
	// },
	{
		path: 'search',
		exact: true,
		component: <SearchPage />,
	},
];

const privateRoute: Array<Record<string, any>> = [
	{
		role: 'user',
		// TODO: path and route just for testing, change it if needed
		routes: [{ path: '/user/home', exact: true, component: <HomePage /> }],
	},
	{
		role: 'admin',
		routes: [{ path: '', exact: true, component: <HomePage /> }],
	},
];
const Router = () => {
	return (
		<Layout>
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
						{routeByRole.routes.map((route: Record<string, any>) => (
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
		</Layout>
	);
};

export default Router;
