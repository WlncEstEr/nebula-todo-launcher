interface IButton {
	title: string
	isPrimary?: boolean
	icon?: React.ReactNode
}

export function Button({ title, isPrimary, icon }: IButton) {
	return (
		<div
			className={`${
				isPrimary
					? 'bg-pr text-black  hover:bg-pr/70'
					: 'bg-sc text-text hover:bg-sc/50'
			} flex items-center gap-2 py-2 px-4 w-fit rounded-lg text-[13px] font-bold transition-colors duration-200 cursor-pointer`}
		>
			{icon ? icon : null} {title}
		</div>
	)
}
