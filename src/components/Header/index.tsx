import { MutableRefObject, Ref, RefAttributes, useContext, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { API_URL } from '../../config';
import { auth } from '../../utils/apis/auth';
import { authContext } from '../../utils/hooks/useAuth';
import usePersistedState from '../../utils/hooks/usePersistedState';
import useSearch from '../../utils/hooks/useSearch';
import SearchButton from './SearchButton';

import { Button, FormElement, Grid, Input, Link, Navbar, Text } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

const Header = () => {
	const { search, searchRef, onSearch } = useSearch();
	const navigate = useNavigate();
	const authToken = useContext(authContext);
	const [t] = useTranslation('common'); // namespace translation
	const [token, setToken] = usePersistedState<string>('token');
	const [refreshToken, setRefreshToken] = usePersistedState<string>('refreshToken');
	const logout = async () => {
		await auth.logout(token, refreshToken).then(() => {
			setToken('');
			setRefreshToken('');
			navigate(0);
		});
	};
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
					<Link href='/' color='inherit'>
						PENTUBE
					</Link>
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
					<Input
						clearable
						enterKeyHint='search'
						ref={searchRef}
						type='text'
						placeholder={t('form.search_placeholder') || 'Search'}
						fullWidth
						aria-label='Search'
					/>
				</Navbar.Item>
				<Navbar.Item>
					<SearchButton onClick={onSearch} />
				</Navbar.Item>
			</Navbar.Content>
			<Navbar.Content>
				{!authToken && (
					<>
						<Navbar.Item>
							<Button bordered auto as={'a'} href={`${API_URL}/auth/login/google`}>
								{t('button.login')}
							</Button>
						</Navbar.Item>
						<Navbar.Item>
							<Button color='primary' auto>
								{t('button.sign_up')}
							</Button>
						</Navbar.Item>
					</>
				)}
				{authToken && (
					<>
						<Navbar.Item>
							<Button bordered auto onPress={logout}>
								{t('button.logout')}
							</Button>
						</Navbar.Item>
					</>
				)}
			</Navbar.Content>
		</Navbar>
	);
};

export default Header;
