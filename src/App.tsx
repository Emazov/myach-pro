import { useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import StartPage from './pages/StartPage';
import Guide from './pages/Guide';
import Game from './pages/Game';
import Results from './pages/Results';

function App() {
	const { tg, initData, user } = useTelegram();

	useEffect(() => {
		tg.ready();
		tg.expand();
	}, []);

	console.log(initData);
	console.log(user);

	return (
		<div className='w-full h-screen'>
			<Routes>
				<Route index element={<StartPage />} />
				<Route path='/guide' element={<Guide />} />
				<Route path='/game' element={<Game />} />
				<Route path='/results' element={<Results />} />
			</Routes>
		</div>
	);
}

export default App;
