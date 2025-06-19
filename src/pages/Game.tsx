const club = { id: 1, name: 'FC Bayern', img_url: './club_logo.jpg' };

const players = [
	{ id: 1, name: 'Player 1', img_url: './kane.jpg' },
	{ id: 2, name: 'Player 2', img_url: './kimich.jpg' },
	{ id: 3, name: 'Player 3', img_url: './kane.jpg' },
	{ id: 4, name: 'Player 4', img_url: './kimich.jpg' },
	{ id: 5, name: 'Player 5', img_url: './kane.jpg' },
	{ id: 6, name: 'Player 6', img_url: './kimich.jpg' },
	{ id: 7, name: 'Player 7', img_url: './kane.jpg' },
	{ id: 8, name: 'Player 8', img_url: './kimich.jpg' },
	{ id: 9, name: 'Player 9', img_url: './kane.jpg' },
	{ id: 10, name: 'Player 10', img_url: './kimich.jpg' },
	{ id: 11, name: 'Player 11', img_url: './kane.jpg' },
	{ id: 12, name: 'Player 12', img_url: './kimich.jpg' },
	{ id: 13, name: 'Player 13', img_url: './kane.jpg' },
	{ id: 14, name: 'Player 14', img_url: './kimich.jpg' },
	{ id: 15, name: 'Player 15', img_url: './kane.jpg' },
	{ id: 16, name: 'Player 16', img_url: './kimich.jpg' },
	{ id: 17, name: 'Player 17', img_url: './kane.jpg' },
	{ id: 18, name: 'Player 18', img_url: './kimich.jpg' },
	{ id: 19, name: 'Player 19', img_url: './kane.jpg' },
	{ id: 20, name: 'Player 20', img_url: './kimich.jpg' },
];

const categories = [
	{ name: 'goat', color: '#0EA94B', slots: 2 },
	{ name: 'Хорош', color: '#94CC7A', slots: 6 },
	{ name: 'норм', color: '#E6A324', slots: 6 },
	{ name: 'Бездарь', color: '#E13826', slots: 6 },
];

const Game = () => {
	return (
		<div className='container flex flex-col justify-around h-full'>
			<div className='hero flex flex-col items-center gap-4'>
				<img
					src={club.img_url}
					alt='club'
					className='rounded-[10rem] w-[clamp(1rem,15vw,10rem)]'
				/>
				{players[0]?.img_url && (
					<>
						<h3 className='text-[clamp(1rem,5vw,3rem)] font-[500]'>
							{players[0]?.name}
						</h3>
						<img
							src={players[0]?.img_url}
							alt='player'
							className='rounded-[2rem] w-[clamp(1rem,50vw,20rem)]'
						/>
					</>
				)}
			</div>
			<ul className='category_list text-center flex flex-col gap-2'>
				{categories.map((category) => (
					<li
						key={`category-${category.name}`}
						className='category_item text-[clamp(1.5rem,4vw,2rem)] font-bold rounded-lg text-white uppercase py-[clamp(0.5rem,1.5vh,1.5rem)]'
						style={{
							backgroundColor: category.color,
						}}
					>
						<p>{category.name}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Game;
