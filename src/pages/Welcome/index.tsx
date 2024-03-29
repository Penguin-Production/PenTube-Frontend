import { useState, useEffect } from 'react';

import useDarkMode from 'use-dark-mode';

import demo from '../../utils/apis/demo';
import usePersistedState from '../../utils/hooks/usePersistedState';
import reactLogo from './../../assets/react.svg';
import { loremIpsum } from './index.data';

import { useTheme, Container, Link, Row, Col, Button, Switch, Text } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

const Welcome = () => {
	const [count, setCount] = useState<number>(0);
	const [data, setData] = usePersistedState<any>('data', '');
	const darkMode = useDarkMode(false, { storageKey: 'theme' });
	const { type, isDark } = useTheme();
	useEffect(() => {
		const getUser = async () => {
			const res = await demo.get();
			setData(res);
			return res;
		};
		getUser();
	}, []);
	// using translation hook to get script from i18n.ts
	const [t, i18n] = useTranslation('translation'); // namespace translation
	return (
		<Container>
			<Container justify='center'>
				<Link href='https://vitejs.dev' target='_blank' rel='noreferrer'>
					<img src='/vite.svg' className='logo' alt='Vite logo' />
				</Link>

				<Link href='https://reactjs.org' target='_blank' rel='noreferrer'>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</Link>
			</Container>
			<Container>
				<Row justify='center'>
					<Col span={1}>
						<Button ripple size={'xs'} onPress={() => i18n.changeLanguage('en')}>
							EN
						</Button>
					</Col>
					<Col span={1}>
						<Button size={'xs'} onPress={() => i18n.changeLanguage('vn')}>
							VN3
						</Button>
					</Col>
				</Row>
				<Row>
					<Col>
						{' '}
						The current theme is: {type}
						<Container>
							<Switch checked={darkMode.value} onChange={() => darkMode.toggle()} />
						</Container>
					</Col>
				</Row>
			</Container>

			<Container>
				<Text h1>{t('homepage.Welcome')}</Text>
				<Text h2>Random name: {data.name?.first}</Text>
				<Container className='card'>
					<Row justify='center'>
						<Button onPress={() => setCount((count) => count + 1)}>
							count is {count}
						</Button>
					</Row>
					<Text>
						Edit{' '}
						<Text as='code' color='$myColor'>
							src/App.tsx
						</Text>{' '}
						and save to test HMR
					</Text>
				</Container>
			</Container>
			<Text>Click on the Vite and React logos to learn more</Text>
			<Text>{loremIpsum}</Text>
		</Container>
	);
};

export default Welcome;
