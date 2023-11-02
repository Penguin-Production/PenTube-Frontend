import { MutableRefObject, Ref, RefAttributes, useContext, useRef, useEffect, Key } from 'react';

import { useNavigate } from 'react-router-dom';

import { API_URL } from '../../config';
import useUserStore from '../../storage/useUserStore';
import { auth } from '../../utils/apis/auth';
import userApi from '../../utils/apis/user.api';
import { LocalStorageUtils } from '../../utils/helper/localStorage';
import { authContext } from '../../utils/hooks/useAuth';
import usePersistedState from '../../utils/hooks/usePersistedState';
import useSearch from '../../utils/hooks/useSearch';
import SearchButton from './SearchButton';

import {
	Avatar,
	Button,
	Dropdown,
	FormElement,
	Grid,
	Input,
	Link,
	Text,
	Navbar,
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

const Header = () => {
	const { search, searchRef, onSearch } = useSearch();
	const navigate = useNavigate();
	const authToken = useContext(authContext);
	const user = useUserStore((state) => state.user);
	const [t] = useTranslation('common'); // namespace translation
	const [token, setToken] = usePersistedState<string>('token');
	const [refreshToken, setRefreshToken] = usePersistedState<string>('refreshToken');
	const logout = async () => {
		await auth.logout(token, refreshToken).catch((err) => console.log(err));
		setToken('');
		setRefreshToken('');
		navigate(0);
	};
	const history = async () => {
		window.location.href = '/history';
	};
	const handleAction = (key: Key) => {
		switch (key) {
			case 'logout':
				logout();
				break;
			case 'history':
				history();
				break;
			default:
				break;
		}
	};
	useEffect(() => {
		const getUser = async () => {
			await userApi.getInformation().then((res) => {
				useUserStore.setState({ user: res.data });
			});
		};
		getUser();
	}, []);
	return (
		<Navbar
			maxWidth='fluid'
			variant='sticky'
			css={{ zIndex: 1000, border: 'none' }}
			containerCss={{ display: 'flex' }}
			shouldHideOnScroll
		>
			<Navbar.Brand>
				<Text b color='inherit'>
					<Link href='/' color={'default'}>
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
					</>
				)}
				{authToken && (
					<>
						<Navbar.Item>
							<Grid.Container>
								<Grid>
									<Dropdown>
										<Dropdown.Trigger>
											<Avatar
												src={user?.avatarUrl}
												size='lg'
												as='button'
												bordered
												color='secondary'
												css={{
													borderRadius: '50%',
													margin: '0 10px',
													':hover': {
														cursor: 'pointer',
													},
												}}
											/>
										</Dropdown.Trigger>
										<Dropdown.Menu onAction={(key: Key) => handleAction(key)}>
											<Dropdown.Item key='history' color='default'>
												History
											</Dropdown.Item>
											<Dropdown.Item key='logout' color='error'>
												{t('button.logout')}
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</Grid>
							</Grid.Container>
						</Navbar.Item>
					</>
				)}
			</Navbar.Content>
		</Navbar>
	);
};

export default Header;
