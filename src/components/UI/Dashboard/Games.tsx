import { quickPlayData } from '../../../data/games.data'

export function Games() {
	return (
		<div>
			<h1 className="uppercase text-[11px]">Quickplay</h1>
			<div className="flex flex-col gap-1 mt-2">
				{quickPlayData.map(game => (
					<div
						key={game.id}
						className="flex items-center gap-1.5 px-1 py-1 rounded-xl transition-colors ease-in-out duration-300 hover:bg-hover cursor-pointer"
					>
						<img
							src={game.image}
							alt={game.title}
							className="w-5.5 h-5.5 rounded-lg"
						/>
						<span className="text-[13px] text-text">{game.title}</span>
					</div>
				))}
			</div>
		</div>
	)
}
