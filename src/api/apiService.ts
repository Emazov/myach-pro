import type { Category, Club, Player } from '../types';

const API_URL = 'http://localhost:7001/api';

// Функция для преобразования полей из camelCase в snake_case
const transformResponseToSnakeCase = <T>(data: any[]): T[] => {
	return data.map((item) => {
		const result: any = {};

		// Преобразуем imgUrl в img_url и clubId в club_id
		if ('imgUrl' in item) result.img_url = item.imgUrl;
		if ('clubId' in item) result.club_id = item.clubId;

		// Копируем остальные поля
		for (const key in item) {
			if (!['imgUrl', 'clubId'].includes(key)) {
				result[key] = item[key];
			}
		}

		return result as T;
	});
};

/**
 * Получить список категорий с сервера
 */
export const fetchCategories = async (): Promise<Category[]> => {
	try {
		const response = await fetch(`${API_URL}/categories`);
		if (!response.ok) {
			throw new Error(`Ошибка при получении категорий: ${response.status}`);
		}
		const categoriesData = await response.json();
		return categoriesData;
	} catch (error) {
		console.error('Ошибка при запросе категорий:', error);
		throw error;
	}
};

/**
 * Получить список клубов с сервера
 */
export const fetchClubs = async (): Promise<Club[]> => {
	try {
		const response = await fetch(`${API_URL}/clubs`);
		if (!response.ok) {
			throw new Error(`Ошибка при получении клубов: ${response.status}`);
		}
		const clubsData = await response.json();
		return transformResponseToSnakeCase<Club>(clubsData);
	} catch (error) {
		console.error('Ошибка при запросе клубов:', error);
		throw error;
	}
};

/**
 * Получить список игроков с сервера
 */
export const fetchPlayers = async (): Promise<Player[]> => {
	try {
		const response = await fetch(`${API_URL}/players`);
		if (!response.ok) {
			throw new Error(`Ошибка при получении игроков: ${response.status}`);
		}
		const playersData = await response.json();
		return transformResponseToSnakeCase<Player>(playersData);
	} catch (error) {
		console.error('Ошибка при запросе игроков:', error);
		throw error;
	}
};
