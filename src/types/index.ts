export interface Player {
	id: number;
	name: string;
	img_url: string;
}

export interface Club {
	id: number;
	name: string;
	img_url: string;
}

export interface Category {
	name: string;
	color: string;
	slots: number;
}

export interface CategorizedPlayers {
	[key: string]: Player[];
}

export interface LocationState {
	categorizedPlayers: CategorizedPlayers;
	club: Club;
}

export interface ModalProps {
	isOpen: boolean;
	message: string;
	onClose: () => void;
}
