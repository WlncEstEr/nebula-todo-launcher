import { ArrowLeftCircle } from 'lucide-react'
import { useEffect } from 'react'
import { ItemGame } from '../../../../store/store'
import { DetailsItemSlug } from './DetailsItemSlug'

interface DetailsProps {
	setIsDetails: React.Dispatch<React.SetStateAction<boolean>>
}

const Details = ({ setIsDetails }: DetailsProps) => {
	const { itemGame } = ItemGame()

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault()
				setIsDetails(false)
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [setIsDetails])

	return (
		<div className="font-montserrat px-3">
			<div className="flex items-center gap-2">
				<ArrowLeftCircle
					size={22}
					onClick={() => setIsDetails(false)}
				/>
				<h1 className="text-base font-bold">About this Game</h1>
			</div>
			<h2 className="text-lg font-semibold">Details</h2>
			<div className="flex gap-5 w-full justify-around mt-3">
				<div className="w-full flex flex-col gap-3 ">
					<DetailsItemSlug
						namespace="Developer"
						title={itemGame?.creator || 'N/A'}
						isPrimary
					/>
					<DetailsItemSlug
						namespace="Publisher"
						title={itemGame?.publisher || 'N/A'}
						isPrimary
					/>
					<DetailsItemSlug
						namespace="Release Date"
						title={itemGame?.releaseDate || 'N/A'}
					/>
					<DetailsItemSlug
						namespace="Platform"
						title={itemGame?.platforms?.join(', ') || 'N/A'}
					/>
					<DetailsItemSlug
						namespace="Genre"
						title={itemGame?.genre || 'N/A'}
						isPrimary
					/>
				</div>
				<div className="w-full flex flex-col gap-3">
					<DetailsItemSlug
						namespace="Rating"
						title={itemGame?.rating ? `${itemGame.rating}%` : 'N/A'}
						isPrimary
					/>
					<DetailsItemSlug
						namespace="Description"
						title={itemGame?.description || 'N/A'}
						isBlock
					/>
				</div>
			</div>
		</div>
	)
}

export default Details
