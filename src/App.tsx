import { useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';
import './App.css';

function App() {
	const { tg, initData, user } = useTelegram();

	useEffect(() => {
		tg.ready();
		tg.expand();
	}, []);

	console.log(initData);
	console.log(user);

	return (
		<div>
			<h1>Hello World</h1>
		</div>
	);
}

export default App;
