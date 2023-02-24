import Box from '../Box';
import Header from '../Header';

import { Container } from '@nextui-org/react';

type props = {
	children: React.ReactNode;
};
const Layout = ({ children }: props) => {
	return (
		<Box css={{ maxW: '100%' }}>
			<Header />
			{children}
		</Box>
	);
};

export default Layout;
