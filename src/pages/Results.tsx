import { useLocation, useNavigate } from 'react-router-dom';

// Определяем типы данных
interface Player {
	id: number;
	name: string;
	img_url: string;
}

interface Club {
	id: number;
	name: string;
	img_url: string;
}

interface CategorizedPlayers {
	[key: string]: Player[];
}

interface LocationState {
	categorizedPlayers: CategorizedPlayers;
	club: Club;
}

const Results = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { categorizedPlayers, club } = (location.state as LocationState) || {
		categorizedPlayers: {},
		club: { id: 0, name: '', img_url: '' },
	};

	// Получаем все категории из объекта categorizedPlayers
	const categories = [
		{ name: 'goat', color: '#0EA94B', slots: 2 },
		{ name: 'Хорош', color: '#94CC7A', slots: 6 },
		{ name: 'норм', color: '#E6A324', slots: 6 },
		{ name: 'Бездарь', color: '#E13826', slots: 6 },
	];

	const handleNewGame = () => {
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
						<li
							key={`category-${category.name}`}
							className='category_item rounded-md py-[clamp(0.2rem,0.5vh,1rem)] flex px-[clamp(0.2rem,0.5vh,1rem)] justify-between items-center'
							style={{
								backgroundColor: category.color,
							}}
						>
							<p className='ml-1 category_name text-[clamp(1rem,4vw,4rem)] font-bold text-white text-left uppercase '>
								{category.name}
							</p>
							<ul className='player_list grid grid-cols-6 gap-1 items-center'>
								{players.map((player) => (
									<li
										className='player_item flex items-center justify-center   rounded-lg w-[clamp(2.5rem,4vw,4rem)]'
										key={`slot-${player.id}`}
									>
										<img
											src={player.img_url}
											alt={player.name}
											className='object-cover rounded-sm'
										/>
									</li>
								))}
							</ul>
						</li>
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
