import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ErrorPage from '../pages/Error';
import Welcome from '../pages/Welcome';
import PublicRoute from './publicRoute';

const publicRoute = [
	{
		path: '',
		exact: true,
		component: <Welcome />,
	},
	{
		path: 'about/name',
		exact: true,
		component: <Welcome />,
	},
];

const Router = () => {
	return (
		<Routes>
			<Route path='/'>
				{publicRoute.map((route) => (
					<Route key={route.path} path={route.path} element={route.component} />
				))}
			</Route>
			<Route path='*' key={'notFound'} element={<ErrorPage />}></Route>
		</Routes>
	);
};

export default Router;
