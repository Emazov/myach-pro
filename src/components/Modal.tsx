import type { ModalProps } from '../types';

const Modal = ({ isOpen, message, onClose }: ModalProps) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 flex items-center justify-center z-50 bg-black/50'>
			<div className='bg-white rounded-lg p-6 w-[80%] max-w-md'>
				<p className='text-center mb-6 text-[clamp(1rem,4vw,1.5rem)]'>
					{message}
				</p>
				<div className='flex justify-center'>
					<button
						onClick={onClose}
						className='bg-[#EC3381] text-white py-2 px-8 rounded-lg text-[clamp(1rem,3vw,1.2rem)]'
					>
						OK
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
