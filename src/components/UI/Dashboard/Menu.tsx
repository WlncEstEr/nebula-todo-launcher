import { Bell } from 'lucide-react'
import React, { useState } from 'react'
import { menuData } from '../../../data/menu.data'

export function Menu() {
	const [activeId, setActiveId] = useState<string>('store')

	return (
		<div>
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2 ml-1.5">
					<img
						src="/images/avatar.png"
						alt="Avatar"
						width={25}
						height={25}
					/>
					<span className="text-[12px] text-text">LolouTheFox</span>
				</div>
				<Bell size={15} />
			</div>

			<div className="flex flex-col gap-2 mt-3">
				{menuData.map(item => (
					<div
						key={item.id}
						onClick={() => setActiveId(item.id)}
						className={`flex items-center gap-2 w-full text-sm cursor-pointer px-2 py-2.5 rounded-xl transition-colors ease-in-out duration-300 ${
							activeId === item.id
								? 'bg-hover text-white font-semibold'
								: 'text-text hover:bg-hover'
						}`}
					>
						{React.cloneElement(item.icon, { size: 18 })}
						<span>{item.title}</span>
					</div>
				))}
			</div>
		</div>
	)
}
