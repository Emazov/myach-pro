import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { CategorizedPlayers, Player } from '../types';
import { categories, players } from '../constants';

type AddPlayerResult =
	| 'success'
	| 'category_not_found'
	| 'category_full'
	| 'player_not_found'
	| 'game_finished';

interface GameState {
	// Основное состояние
	currentPlayerIndex: number;
	categorizedPlayers: CategorizedPlayers;
	playerQueue: Player[];
	processedPlayersCount: number;

	// Computed values
	progressPercentage: number;

	// Actions
	addPlayerToCategory: (categoryName: string) => AddPlayerResult;
	replacePlayerInCategory: (
		categoryName: string,
		playerToReplace: Player,
	) => void;
	getCategoryFilled: (categoryName: string) => string;
	getCurrentPlayer: () => Player | undefined;
	resetGame: () => void;
	initializeGame: () => void;
}

const initialState = {
	currentPlayerIndex: 0,
	categorizedPlayers: {
		goat: [],
		Хорош: [],
		норм: [],
		Бездарь: [],
	} as CategorizedPlayers,
	playerQueue: [...players],
	processedPlayersCount: 0,
	progressPercentage: 0,
};

export const useGameStore = create<GameState>()(
	devtools(
		persist(
			(set, get) => ({
				...initialState,

				// Actions
				addPlayerToCategory: (categoryName: string): AddPlayerResult => {
					const state = get();
					const category = categories.find((cat) => cat.name === categoryName);

					if (!category) {
						return 'category_not_found';
					}

					const currentCategoryPlayers =
						state.categorizedPlayers[categoryName] || [];

					if (currentCategoryPlayers.length >= category.slots) {
						return 'category_full';
					}

					const playerToAdd = state.playerQueue[state.currentPlayerIndex];
					if (!playerToAdd) {
						return 'player_not_found';
					}

					const updatedCategorizedPlayers = {
						...state.categorizedPlayers,
						[categoryName]: [...currentCategoryPlayers, playerToAdd],
					};

					const newProcessedCount = state.processedPlayersCount + 1;
					const newCurrentIndex = state.currentPlayerIndex + 1;
					const newProgressPercentage = (newProcessedCount / 20) * 100;

					set({
						categorizedPlayers: updatedCategorizedPlayers,
						currentPlayerIndex: newCurrentIndex,
						processedPlayersCount: newProcessedCount,
						progressPercentage: newProgressPercentage,
					});

					// Проверяем завершение игры
					if (newProcessedCount >= 20) {
						return 'game_finished';
					}

					return 'success';
				},

				replacePlayerInCategory: (
					categoryName: string,
					playerToReplace: Player,
				) => {
					const state = get();
					const currentPlayer = state.playerQueue[state.currentPlayerIndex];

					if (!currentPlayer) return;

					// Заменяем игрока в категории
					const categoryPlayers = state.categorizedPlayers[categoryName] || [];
					const updatedCategoryPlayers = categoryPlayers.map((player) =>
						player.id === playerToReplace.id ? currentPlayer : player,
					);

					// Добавляем замененного игрока в конец очереди
					const updatedQueue = [...state.playerQueue, playerToReplace];

					const newProcessedCount = state.processedPlayersCount + 1;
					const newCurrentIndex = state.currentPlayerIndex + 1;
					const newProgressPercentage = (newProcessedCount / 20) * 100;

					set({
						categorizedPlayers: {
							...state.categorizedPlayers,
							[categoryName]: updatedCategoryPlayers,
						},
						playerQueue: updatedQueue,
						currentPlayerIndex: newCurrentIndex,
						processedPlayersCount: newProcessedCount,
						progressPercentage: newProgressPercentage,
					});
				},

				getCategoryFilled: (categoryName: string) => {
					const state = get();
					const playerCount =
						state.categorizedPlayers[categoryName]?.length || 0;
					const category = categories.find((cat) => cat.name === categoryName);
					if (!category) return '0 / 0';
					return `${playerCount} / ${category.slots}`;
				},

				getCurrentPlayer: () => {
					const state = get();
					return state.playerQueue[state.currentPlayerIndex];
				},

				resetGame: () => {
					set({
						...initialState,
						playerQueue: [...players],
					});
				},

				initializeGame: () => {
					set({
						...initialState,
						playerQueue: [...players],
					});
				},
			}),
			{
				name: 'game-storage',
				partialize: (state) => ({
					categorizedPlayers: state.categorizedPlayers,
					currentPlayerIndex: state.currentPlayerIndex,
					processedPlayersCount: state.processedPlayersCount,
					progressPercentage: state.progressPercentage,
				}),
			},
		),
		{
			name: 'game-store',
		},
	),
);
