import { PlusCircle } from 'lucide-react'
import { ItemGame } from '../../../store/store'
import { Button } from '../Button/Button'
import { FieldDiscount } from '../FieldDiscount/FieldDiscount'

interface DetailsProps {
	setIsDetails: React.Dispatch<React.SetStateAction<boolean>>
}

export function MainGames({ setIsDetails }: DetailsProps) {
	const { itemGame } = ItemGame()

	return (
		<div className="pt-10 pl-2.5 w-full flex gap-5">
			<div
				onClick={() => setIsDetails(true)}
				className="w-220 relative"
			>
				<img
					className="rounded-3xl w-full"
					src={itemGame?.image}
					alt={itemGame?.title}
				/>
				<div className="absolute right-3 bottom-3">
					<FieldDiscount
						price={itemGame?.price || 0}
						oldPrice={itemGame?.oldPrice || 0}
					/>
				</div>
			</div>

			<div className="flex flex-col w-full justify-center">
				<h1 className="text-4xl font-bold text-text font-montserrat">
					{itemGame?.title}
				</h1>
				<p className="text-[18px] text-gray-400">{itemGame?.creator}</p>
				<div className="flex gap-2 mt-5">
					<Button
						title="Buy Now"
						isPrimary
					/>
					<Button
						title="Wishlist"
						icon={<PlusCircle />}
					/>
				</div>
			</div>
		</div>
	)
}
