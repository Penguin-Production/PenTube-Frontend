import React from 'react';

import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { BrowserRouter, createBrowserRouter } from 'react-router-dom';

import App from './App';
import './config/i18n/i18n.ts';
import ErrorPage from './pages/Error';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
