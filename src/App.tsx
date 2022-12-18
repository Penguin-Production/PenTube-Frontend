import { useEffect, useState } from 'react';

import './App.css';
import reactLogo from './assets/react.svg';
import demo from './utils/apis/demo';

import { useTranslation } from 'react-i18next';

function App() {
	const [count, setCount] = useState<number>(0);
	const [data, setData] = useState<any>();
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
		<div className='App'>
			<div>
				<a href='https://vitejs.dev' target='_blank'>
					<img src='/vite.svg' className='logo' alt='Vite logo' />
				</a>
				<a href='https://reactjs.org' target='_blank'>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a>
			</div>
			<button onClick={() => i18n.changeLanguage('en')}>EN</button>
			<button onClick={() => i18n.changeLanguage('vn')}>VN</button>
			<h1>{t('homepage.Welcome')}</h1>
			<h2>Random name: {data?.name.first}</h2>
			<div className='card'>
				<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
		</div>
	);
}

export default App;
