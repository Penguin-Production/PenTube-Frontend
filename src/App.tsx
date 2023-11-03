import React, { useEffect, useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import useDarkMode from 'use-dark-mode';

import './App.css';
import ErrorPage from './pages/Error';
import Welcome from './pages/Welcome';
import Router from './routes';
import { lightTheme, darkTheme } from './theme';
import Auth from './utils/hooks/useAuth';

import { NextUIProvider } from '@nextui-org/react';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	const darkMode = useDarkMode(false);
	return (
		<ErrorBoundary FallbackComponent={ErrorPage}>
			<ToastContainer />
			<NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
				<Router />
			</NextUIProvider>
		</ErrorBoundary>
	);
};

export default App;
