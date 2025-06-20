import type { Player, Category, Club } from '../types';

export const club: Club = {
	id: 1,
	name: 'FC Bayern',
	img_url: './bayern_logo.png',
};

export const players: Player[] = [
	{ id: 1, name: 'Player 1', img_url: './kane.jpg', club_id: 1 },
	{ id: 2, name: 'Player 2', img_url: './kimich.jpg', club_id: 1 },
	{ id: 3, name: 'Player 3', img_url: './kane.jpg', club_id: 1 },
	{ id: 4, name: 'Player 4', img_url: './kimich.jpg', club_id: 1 },
	{ id: 5, name: 'Player 5', img_url: './kane.jpg', club_id: 1 },
	{ id: 6, name: 'Player 6', img_url: './kimich.jpg', club_id: 1 },
	{ id: 7, name: 'Player 7', img_url: './kane.jpg', club_id: 1 },
	{ id: 8, name: 'Player 8', img_url: './kimich.jpg', club_id: 1 },
	{ id: 9, name: 'Player 9', img_url: './kane.jpg', club_id: 1 },
	{ id: 10, name: 'Player 10', img_url: './kimich.jpg', club_id: 1 },
	{ id: 11, name: 'Player 11', img_url: './kane.jpg', club_id: 1 },
	{ id: 12, name: 'Player 12', img_url: './kimich.jpg', club_id: 1 },
	{ id: 13, name: 'Player 13', img_url: './kimich.jpg', club_id: 1 },
	{ id: 14, name: 'Player 14', img_url: './kimich.jpg', club_id: 1 },
	{ id: 15, name: 'Player 15', img_url: './kane.jpg', club_id: 1 },
	{ id: 16, name: 'Player 16', img_url: './kimich.jpg', club_id: 1 },
	{ id: 17, name: 'Player 17', img_url: './kane.jpg', club_id: 1 },
	{ id: 18, name: 'Player 18', img_url: './kimich.jpg', club_id: 1 },
	{ id: 19, name: 'Player 19', img_url: './kane.jpg', club_id: 1 },
	{ id: 20, name: 'Player 20', img_url: './kimich.jpg', club_id: 1 },
];

export const categories: Category[] = [
	{ name: 'Goat', color: '#0EA94B', slots: 2 },
	{ name: 'Хорош', color: '#94CC7A', slots: 6 },
	{ name: 'Норм', color: '#E6A324', slots: 6 },
	{ name: 'Бездарь', color: '#E13826', slots: 6 },
];
