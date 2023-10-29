import React from 'react';

import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { BrowserRouter, createBrowserRouter } from 'react-router-dom';

import './config/i18n/i18n'
import App from './App';
import ErrorPage from './pages/Error';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
