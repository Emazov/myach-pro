import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { CategorizedPlayers, Player, Category } from '../types';
import { fetchCategories, fetchPlayers } from '../api';

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
	categories: Category[];
	isLoading: boolean;
	error: string | null;

	// Computed values
	progressPercentage: number;

	// Actions
	addPlayerToCategory: (categoryName: string) => AddPlayerResult;
	replacePlayerInCategory: (
		categoryName: string,
		playerToReplace: Player,
	) => AddPlayerResult;
	getCategoryFilled: (categoryName: string) => string;
	getCurrentPlayer: () => Player | undefined;
	resetGame: () => void;
	initializeGame: () => Promise<void>;
}

const initialState = {
	currentPlayerIndex: 0,
	categorizedPlayers: {} as CategorizedPlayers,
	playerQueue: [],
	processedPlayersCount: 0,
	progressPercentage: 0,
	categories: [],
	isLoading: false,
	error: null,
};

export const useGameStore = create<GameState>()(
	devtools(
		persist(
			(set, get) => ({
				...initialState,

				// Actions
				addPlayerToCategory: (categoryName: string): AddPlayerResult => {
					const state = get();
					const category = state.categories.find(
						(cat) => cat.name === categoryName,
					);

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
					const newProgressPercentage =
						(newProcessedCount / state.playerQueue.length) * 100;

					set({
						categorizedPlayers: updatedCategorizedPlayers,
						currentPlayerIndex: newCurrentIndex,
						processedPlayersCount: newProcessedCount,
						progressPercentage: newProgressPercentage,
					});

					// Проверяем завершение игры
					if (newProcessedCount >= state.playerQueue.length) {
						return 'game_finished';
					}

					return 'success';
				},

				replacePlayerInCategory: (
					categoryName: string,
					playerToReplace: Player,
				): AddPlayerResult => {
					const state = get();
					const currentPlayer = state.playerQueue[state.currentPlayerIndex];

					if (!currentPlayer) return 'player_not_found';

					// Заменяем игрока в категории
					const categoryPlayers = state.categorizedPlayers[categoryName] || [];
					const updatedCategoryPlayers = categoryPlayers.map((player) =>
						player.id === playerToReplace.id ? currentPlayer : player,
					);

					// Добавляем замененного игрока в конец очереди
					const updatedQueue = [...state.playerQueue, playerToReplace];

					// При замене игрока processedPlayersCount НЕ увеличивается
					const newCurrentIndex = state.currentPlayerIndex + 1;

					set({
						categorizedPlayers: {
							...state.categorizedPlayers,
							[categoryName]: updatedCategoryPlayers,
						},
						playerQueue: updatedQueue,
						currentPlayerIndex: newCurrentIndex,
						// processedPlayersCount и progressPercentage не изменяются при замене
					});

					// При замене игрока проверяем завершение по текущему счетчику
					if (state.processedPlayersCount >= state.playerQueue.length) {
						return 'game_finished';
					}

					return 'success';
				},

				getCategoryFilled: (categoryName: string) => {
					const state = get();
					const playerCount =
						state.categorizedPlayers[categoryName]?.length || 0;
					const category = state.categories.find(
						(cat) => cat.name === categoryName,
					);
					if (!category) return '0 / 0';
					return `${playerCount} / ${category.slots}`;
				},

				getCurrentPlayer: () => {
					const state = get();
					return state.playerQueue[state.currentPlayerIndex];
				},

				resetGame: () => {
					const state = get();
					set({
						...initialState,
						categories: state.categories,
						isLoading: false,
						playerQueue: [...state.playerQueue],
						categorizedPlayers: Object.fromEntries(
							state.categories.map((cat) => [cat.name, []]),
						),
					});
				},

				initializeGame: async () => {
					set({ isLoading: true, error: null });

					try {
						// Загружаем категории и игроков с сервера
						const [categories, players] = await Promise.all([
							fetchCategories(),
							fetchPlayers(),
						]);

						// Создаем начальное состояние категорий
						const emptyCategorizedPlayers = Object.fromEntries(
							categories.map((cat) => [cat.name, []]),
						);

						set({
							categories,
							playerQueue: players,
							categorizedPlayers: emptyCategorizedPlayers,
							currentPlayerIndex: 0,
							processedPlayersCount: 0,
							progressPercentage: 0,
							isLoading: false,
						});
					} catch (error) {
						console.error('Ошибка при инициализации игры:', error);
						set({
							error:
								'Произошла ошибка при загрузке данных. Проверьте соединение с сервером.',
							isLoading: false,
						});
					}
				},
			}),
			{
				name: 'game-storage',
				partialize: (state) => ({
					categorizedPlayers: state.categorizedPlayers,
					currentPlayerIndex: state.currentPlayerIndex,
					processedPlayersCount: state.processedPlayersCount,
					progressPercentage: state.progressPercentage,
					categories: state.categories,
				}),
			},
		),
		{
			name: 'game-store',
		},
	),
);
