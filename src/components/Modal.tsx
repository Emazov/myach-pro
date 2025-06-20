import type { ModalProps } from '../types';

const Modal = ({ isOpen, message, onClose }: ModalProps) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 flex items-end z-50 bg-black/50'>
			<div className='bg-white rounded-lg p-6 w-full'>
				<p className='text-center mb-6 text-[clamp(1rem,4vw,1.5rem)]'>
					{message}
				</p>
				<div className='flex flex-col gap-2 mb-[clamp(1rem,1.5vh,1rem)]'>
					<button
						onClick={onClose}
						className='link_btn bg-[#EC3381] border-1 border-[#EC3381] text-white py-[clamp(1rem,1vw,1rem)] text-[clamp(1rem,2vh,1.5rem)]]'
					>
						Заменить игрока
					</button>
					<button
						onClick={onClose}
						className='link_btn border-1 border-[#EC3381] text-[#EC3381] py-[clamp(1rem,1vw,1rem)] text-[clamp(1rem,2vh,1.5rem)]'
					>
						Выбрать другую категорию
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
