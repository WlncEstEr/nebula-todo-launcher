interface Props {
	namespace:
		| 'Refund Type'
		| 'Developer'
		| 'Publisher'
		| 'Release Date'
		| 'Platform'
		| 'Genre'
		| 'Rating'
		| 'Description'
	title: string
	isPrimary?: boolean
	isBlock?: boolean
}

export function DetailsItemSlug({
	namespace,
	title,
	isPrimary,
	isBlock
}: Props) {
	if (isBlock) {
		return (
			<div className="flex flex-col gap-1 w-full text-sm border-b border-gray-400/20 pb-2">
				<p>{namespace}</p>
				<span className="text-gray-300 leading-relaxed">{title}</span>
			</div>
		)
	}

	return (
		<div className="flex justify-between w-full h-7 text-sm border-b border-gray-400/20">
			<p>{namespace}</p>
			<span
				className={
					isPrimary
						? 'text-[#a7a770] border-b border-[#a7a770] h-fit flex items-center '
						: ''
				}
			>
				{title}
			</span>
		</div>
	)
}
