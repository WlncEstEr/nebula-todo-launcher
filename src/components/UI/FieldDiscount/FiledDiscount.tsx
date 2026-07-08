interface IFiledDiscount {
	price: number
	oldPrice?: number
}

export function FiledDiscount({ price, oldPrice }: IFiledDiscount) {
	return (
		<div className="bg-sc  rounded-2xl w-fit flex items-center  ">
			{oldPrice! > 0 && (
				<div className="px-1 py-0.5 text-[12px] text-gray-500 font-bold line-through">
					${oldPrice}
				</div>
			)}
			<div className="bg-pr w-full px-1.5 py-0.5 text-[14px] rounded-2xl text-bg font-bold">
				{price > 0 ? `$${price.toFixed(2)}` : 'Free'}
			</div>
		</div>
	)
}
