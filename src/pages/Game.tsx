import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '../hooks/useGameState';
import { categories, club, players } from '../constants';
import { Modal, CategoryItem } from '../components';

const Game = () => {
	const navigate = useNavigate();
	const {
		currentPlayer,
		categorizedPlayers,
		progressPercentage,
		addPlayerToCategory,
		getCurrentPlayer,
	} = useGameState();

	// Состояние для модального окна
	const [modal, setModal] = useState({
		isOpen: false,
		message: '',
	});

	const closeModal = () => {
		setModal({
			isOpen: false,
			message: '',
		});
	};

	const showModal = (message: string) => {
		setModal({
			isOpen: true,
			message,
		});
	};

	// Функция для добавления игрока в категорию
	const handleCategoryClick = (categoryName: string) => {
		const result = addPlayerToCategory(categoryName);

		switch (result) {
			case 'category_not_found':
				showModal('Категория не найдена!');
				break;
			case 'category_full':
				showModal(
					`В категории " ${categoryName.toUpperCase()} " больше нет мест!`,
				);
				break;
			case 'player_not_found':
				showModal('Игрок не найден!');
				break;
			case 'game_finished':
				// Игра закончена - перенаправляем на страницу результатов
				navigate('/results', {
					state: {
						categorizedPlayers,
						club,
					},
				});
				break;
			case 'success':
				// Игрок успешно добавлен, продолжаем игру
				break;
		}
	};

	const player = getCurrentPlayer();

	return (
		<div className='container flex flex-col justify-around h-full'>
			<Modal
				isOpen={modal.isOpen}
				message={modal.message}
				onClose={closeModal}
			/>

			<div className='progress_bar flex flex-col'>
				<div className='w-full h-2.5 bg-gray-300 rounded-lg flex relative'>
					<div
						className='h-full bg-[linear-gradient(90deg,_#EC3381_10%,_#FFEC13_100%)] rounded-lg'
						style={{ width: `${progressPercentage}%` }}
					/>
					<img
						src={club.img_url}
						alt='progress logo'
						className='absolute top-1/2 -translate-y-1/2 w-8 z-10'
						style={{ left: `calc(${progressPercentage}% - 16px)` }}
					/>
				</div>
				<div className='text-right text-[clamp(1rem,2vw,2rem)] font-[500] mt-2'>
					{currentPlayer + 1} / {players.length}
				</div>
			</div>

			<div className='hero flex flex-col items-center gap-4'>
				{player?.img_url && (
					<>
						<h3 className='text-[clamp(1rem,5vw,3rem)] font-[500]'>
							{player.name}
						</h3>
						<img
							src={player.img_url}
							alt='player'
							className='rounded-[2rem] w-[clamp(1rem,50vw,20rem)]'
						/>
					</>
				)}
			</div>

			<ul className='category_list text-center flex flex-col gap-2'>
				{categories.map((category) => (
					<CategoryItem
						key={`category-${category.name}`}
						category={category}
						players={categorizedPlayers[category.name] || []}
						onClick={() => handleCategoryClick(category.name)}
					/>
				))}
			</ul>
		</div>
	);
};

export default Game;
