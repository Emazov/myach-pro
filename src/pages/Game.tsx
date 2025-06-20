import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore, useModalStore } from '../store';
import { categories, club, players } from '../constants';
import { Modal, CategoryItem } from '../components';

const Game = () => {
	const navigate = useNavigate();

	// Zustand stores
	const {
		currentPlayerIndex,
		categorizedPlayers,
		progressPercentage,
		addPlayerToCategory,
		replacePlayerInCategory,
		getCurrentPlayer,
		initializeGame,
	} = useGameStore();

	const {
		isOpen,
		mode,
		message,
		categoryName,
		players: modalPlayers,
		showMessageModal,
		showReplacePlayerModal,
		closeModal,
	} = useModalStore();

	// Инициализация игры при загрузке компонента
	React.useEffect(() => {
		initializeGame();
	}, [initializeGame]);

	// Функция для добавления игрока в категорию
	const handleCategoryClick = (categoryName: string) => {
		const result = addPlayerToCategory(categoryName);

		switch (result) {
			case 'category_not_found':
				showMessageModal('Категория не найдена!');
				break;
			case 'category_full':
				// Показываем модалку с заменой игроков
				const categoryPlayers = categorizedPlayers[categoryName] || [];
				showReplacePlayerModal(categoryName, categoryPlayers);
				break;
			case 'player_not_found':
				showMessageModal('Игрок не найден!');
				break;
			case 'game_finished':
				// Игра закончена - перенаправляем на страницу результатов
				navigate('/results');
				break;
			case 'success':
				// Игрок успешно добавлен, продолжаем игру
				break;
		}
	};

	// Обработчик замены игрока
	const handleReplacePlayer = (playerToReplace: any) => {
		if (categoryName) {
			replacePlayerInCategory(categoryName, playerToReplace);
		}
	};

	// Обработчик выбора другой категории
	const handleChooseOtherCategory = () => {
		// Просто закрываем модалку и позволяем выбрать другую категорию
	};

	const player = getCurrentPlayer();

	return (
		<div className='container flex flex-col justify-around h-full'>
			<Modal
				isOpen={isOpen}
				mode={mode}
				message={message}
				categoryName={categoryName}
				players={modalPlayers}
				onClose={closeModal}
				onReplacePlayer={handleReplacePlayer}
				onChooseOtherCategory={handleChooseOtherCategory}
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
					{currentPlayerIndex + 1} / {players.length}
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
