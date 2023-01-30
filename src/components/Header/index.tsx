import { MutableRefObject, Ref, RefAttributes, useRef } from 'react';

import SearchButton from './SearchButton';

import { Button, FormElement, Grid, Input, Navbar, Text } from '@nextui-org/react';

const Header = () => {
	return (
		<Navbar
			maxWidth='fluid'
			variant='sticky'
			css={{ zIndex: 1000 }}
			containerCss={{ display: 'flex' }}
			shouldHideOnScroll
		>
			<Navbar.Brand>
				<Text b color='inherit'>
					ACME
				</Text>
			</Navbar.Brand>
			<Navbar.Content
				css={{ w: '100%', justifyContent: 'center', padding: '$10' }}
				hideIn={'xs'}
			>
				<Navbar.Item
					css={{
						flexBasis: '500px',
						flexShrink: 1,
						flexGrow: 0,
					}}
				>
					<Input clearable type='text' placeholder='Search...' fullWidth />
				</Navbar.Item>
				<Navbar.Item>
					<SearchButton />
				</Navbar.Item>
			</Navbar.Content>
			<Navbar.Content>
				<Navbar.Link>Login</Navbar.Link>
				<Navbar.Item>
					<Button color='primary' auto>
						Sign Up
					</Button>
				</Navbar.Item>
			</Navbar.Content>
		</Navbar>
	);
};

export default Header;
