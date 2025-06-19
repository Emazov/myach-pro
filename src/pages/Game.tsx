import { Link } from 'react-router-dom';

const Game = () => {
	return (
		<div className='container flex flex-col justify-around h-full'>
			<Link to='/guide' className='link_btn'>
				Назад
			</Link>
		</div>
	);
};

export default Game;
