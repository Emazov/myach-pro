import { useState } from 'react';
import type { CategorizedPlayers } from '../types';
import { categories, players } from '../constants';

type AddPlayerResult =
	| 'success'
	| 'category_not_found'
	| 'category_full'
	| 'player_not_found'
	| 'game_finished';

export const useGameState = () => {
	const [currentPlayer, setCurrentPlayer] = useState(0);
	const [categorizedPlayers, setCategorizedPlayers] =
		useState<CategorizedPlayers>({
			goat: [],
			Хорош: [],
			норм: [],
			Бездарь: [],
		});

	const progressPercentage = ((currentPlayer + 1) / players.length) * 100;

	const addPlayerToCategory = (categoryName: string): AddPlayerResult => {
		const category = categories.find((cat) => cat.name === categoryName);

		if (!category) {
			return 'category_not_found';
		}

		const currentCategoryPlayers = categorizedPlayers[categoryName] || [];

		if (currentCategoryPlayers.length >= category.slots) {
			return 'category_full';
		}

		const playerToAdd = players[currentPlayer];
		if (!playerToAdd) {
			return 'player_not_found';
		}

		const updatedCategorizedPlayers = {
			...categorizedPlayers,
			[categoryName]: [...currentCategoryPlayers, playerToAdd],
		};

		setCategorizedPlayers(updatedCategorizedPlayers);

		if (currentPlayer < players.length - 1) {
			setCurrentPlayer(currentPlayer + 1);
			return 'success';
		} else {
			return 'game_finished';
		}
	};

	const getCategoryFilled = (categoryName: string) => {
		const playerCount = categorizedPlayers[categoryName]?.length || 0;
		const category = categories.find((cat) => cat.name === categoryName);
		if (!category) return '0 / 0';
		return `${playerCount} / ${category.slots}`;
	};

	const getCurrentPlayer = () => players[currentPlayer];

	return {
		currentPlayer,
		categorizedPlayers,
		progressPercentage,
		addPlayerToCategory,
		getCategoryFilled,
		getCurrentPlayer,
		isGameFinished: currentPlayer >= players.length - 1,
	};
};
