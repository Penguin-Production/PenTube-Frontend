import { MutableRefObject, Ref, RefAttributes, useRef } from 'react';

import useSearch from '../../utils/hooks/useSearch';
import SearchButton from './SearchButton';

import { Button, FormElement, Grid, Input, Link, Navbar, Text } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

const Header = () => {
	const { search, searchRef, onSearch } = useSearch();
	const [t, i18n] = useTranslation('common'); // namespace translation
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
				<Navbar.Item>
					<Button bordered auto>
						{t('button.login')}
					</Button>
				</Navbar.Item>
				<Navbar.Item>
					<Button color='primary' auto>
						{t('button.sign_up')}
					</Button>
				</Navbar.Item>
			</Navbar.Content>
		</Navbar>
	);
};

export default Header;
