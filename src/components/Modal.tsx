import type { ModalProps } from '../types';

const Modal = ({
	isOpen,
	mode,
	message,
	categoryName,
	players = [],
	onClose,
	onReplacePlayer,
	onChooseOtherCategory,
}: ModalProps) => {
	if (!isOpen) return null;

	const handleReplacePlayer = (player: any) => {
		onReplacePlayer?.(player);
		onClose();
	};

	const handleChooseOtherCategory = () => {
		onChooseOtherCategory?.();
		onClose();
	};

	if (mode === 'replace_player') {
		return (
			<div className='fixed inset-0 flex items-end z-50 bg-black/50'>
				<div className='bg-white rounded-lg p-6 w-full max-h-[80vh] overflow-y-auto'>
					<h3 className='text-center mb-4 text-[clamp(1rem,4vw,1.5rem)] font-semibold'>
						В категории "{categoryName?.toUpperCase()}" больше нет мест!
					</h3>
					<p className='text-center mb-6 text-[clamp(0.9rem,3vw,1.2rem)]'>
						Выберите игрока для замены:
					</p>

					{/* Сетка игроков */}
					<div className='grid grid-cols-3 gap-3 mb-6'>
						{players.map((player) => (
							<button
								key={player.id}
								onClick={() => handleReplacePlayer(player)}
								className='flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 transition-colors'
							>
								<img
									src={player.img_url}
									alt={player.name}
									className='w-16 h-16 object-cover rounded-lg mb-2'
								/>
								<span className='text-sm text-center'>{player.name}</span>
							</button>
						))}
					</div>

					<div className='flex flex-col gap-2'>
						<button
							onClick={handleChooseOtherCategory}
							className='link_btn border-1 border-[#EC3381] text-[#EC3381] py-[clamp(1rem,1vw,1rem)] text-[clamp(1rem,2vh,1.5rem)]'
						>
							Выбрать другую категорию
						</button>
					</div>
				</div>
			</div>
		);
	}

	// Режим обычного сообщения
	return (
		<div className='fixed inset-0 flex items-end z-50 bg-black/50'>
			<div className='bg-white rounded-lg p-6 w-full'>
				<p className='text-center mb-6 text-[clamp(1rem,4vw,1.5rem)]'>
					{message}
				</p>
				<div className='flex justify-center'>
					<button
						onClick={onClose}
						className='link_btn bg-[#EC3381] border-1 border-[#EC3381] text-white py-[clamp(1rem,1vw,1rem)] text-[clamp(1rem,2vh,1.5rem)] px-8'
					>
						ОК
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
