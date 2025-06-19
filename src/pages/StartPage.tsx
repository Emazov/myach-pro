import { useEffect } from 'react';
import { useTelegram } from '../hooks/useTelegram';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
	const { tg } = useTelegram();
	const navigate = useNavigate();

	useEffect(() => {
		tg.MainButton.setText('Поехали!');
		tg.MainButton.show();

		const onMainButtonClick = () => {
			navigate('/guide');
		};

		tg.MainButton.onClick(onMainButtonClick);

		return () => {
			tg.MainButton.offClick(onMainButtonClick);
			tg.MainButton.hide();
		};
	}, [tg, navigate]);

	return (
		<div className='welcome bg-[url("/main_bg.jpg")] bg-cover bg-center h-full'>
			<div className='container flex flex-col justify-around h-full'>
				<div className='hero flex flex-col items-center'>
					<h2 className='text-white text-[clamp(2.5rem,9vw,3.5rem)] text-center font-bold'>
						Добро пожаловать!
					</h2>

					<img src='./main_logo.png' alt='logo' className='logo' />
				</div>
			</div>
		</div>
	);
};

export default StartPage;
