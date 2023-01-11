import useDarkMode from 'use-dark-mode';

import { darkTheme, lightTheme } from '../../theme';

import { Container, NextUIProvider, Text } from '@nextui-org/react';

const ErrorPage = () => {
	const darkMode = useDarkMode(false, {
		storageKey: 'theme',
	});
	return (
		<NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
			<Container>
				<Text h1>404</Text>
				<Text h2>Page not found</Text>
			</Container>
		</NextUIProvider>
	);
};

export default ErrorPage;
