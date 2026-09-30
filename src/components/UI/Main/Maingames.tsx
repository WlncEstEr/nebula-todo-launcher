import { PlusCircle } from 'lucide-react'
import { useGames } from '../../../hooks/useGames'
import { ItemGame } from '../../../store/store'
import { Button } from '../Button/Button'

export function MainGames() {
  const { selectedGameId } = ItemGame()

  const { data } = useGames()

  const game = data?.find((g) => g?.id === selectedGameId)

  return (
    <div className="pt-10 pl-2.5 w-full flex gap-5">
      <div className="w-105 h-60 relative overflow-hidden rounded-3xl shrink-0">
        <img
          className="w-full h-full object-cover"
          src={game?.image}
          alt={game?.title}
        />
        {/* <div className="absolute right-3 bottom-3">
          <FieldDiscount
            price={game?.price ?? 0}
            oldPrice={game?.oldPrice ?? 0}
          />
        </div> */}
      </div>

      <div className="flex flex-col w-full justify-center">
        <h1 className="text-4xl font-bold text-text font-montserrat">
          {game?.title}
        </h1>
        {/* <p className="text-[18px] text-gray-400">{game?.creator}</p> */}
        <div className="flex gap-2 mt-5">
          <Button title="Buy Now" isPrimary />
          <Button title="Wishlist" icon={<PlusCircle />} />
        </div>
      </div>
    </div>
  )
}
