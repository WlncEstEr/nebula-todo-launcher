import { Users } from 'lucide-react'
import { ProgressBar } from '../ProgressBar/ProgressBar'

export function Friends() {
	return (
		<div className="h-full relative">
			<div className="absolute bottom-0 left-0 w-full h-fit gap-2 flex flex-col">
				<div className="px-2 py-2.5 flex flex-row justify-between border-2 border-hover rounded-2xl">
					<div className="flex flex-row items-center gap-1 text-sm text-text">
						<Users size={18} />
						<span className="text-[14px]">Friends</span>
					</div>
					<div className="text-[11px] flex items-center">2 online</div>
				</div>
				<div className="px-2 py-1.5 border-2 border-hover rounded-2xl">
					<div className="flex flex-col">
						<div className="flex flex-row justify-between">
							<div className="flex flex-row items-center gap-1 text-sm text-text">
								<img
									src="/images/small/small-thefinals.jpg"
									alt="thefinals"
									width={20}
									height={20}
									className="rounded-md"
								/>
								<span className="text-[14px]">The Finals</span>
							</div>
							<div className="text-[11px] flex items-center">3 mins</div>
						</div>
						<ProgressBar value={75} />
					</div>
				</div>
			</div>
		</div>
	)
}
