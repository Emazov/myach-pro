import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store';
import { categories, club } from '../constants';
import { CategoryItem } from '../components';

const Results = () => {
	const navigate = useNavigate();
	const { categorizedPlayers, resetGame } = useGameStore();

	const handleNewGame = () => {
		resetGame();
		navigate('/game');
	};

	const handleGoHome = () => {
		navigate('/');
	};

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='flex flex-col items-center mb-8'>
				<img
					src={club.img_url}
					alt={club.name}
					className='w-24 h-24 object-contain mb-4'
				/>
				<h1 className='text-[clamp(1.5rem,5vw,3rem)] font-bold text-center mb-2'>
					{club.name}
				</h1>
				<h2 className='text-[clamp(1rem,3vw,2rem)] text-center mb-8'>
					Результаты распределения игроков
				</h2>
			</div>

			<ul className='category_list flex flex-col gap-2'>
				{categories.map((category) => {
					const players = categorizedPlayers[category.name] || [];
					return (
						<CategoryItem
							key={`category-${category.name}`}
							category={category}
							players={players}
							showPlayerImages={true}
						/>
					);
				})}
			</ul>

			<div className='flex justify-center gap-4 mt-8'>
				<button
					onClick={handleNewGame}
					className='bg-[#EC3381] text-white py-3 px-6 rounded-lg text-[clamp(1rem,3vw,1.2rem)]'
				>
					Новая игра
				</button>
				<button
					onClick={handleGoHome}
					className='bg-gray-700 text-white py-3 px-6 rounded-lg text-[clamp(1rem,3vw,1.2rem)]'
				>
					На главную
				</button>
			</div>
		</div>
	);
};

export default Results;
