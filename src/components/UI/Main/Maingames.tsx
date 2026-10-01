import { PlusCircle } from 'lucide-react'

import { useStoreLibrary } from '@/store/library.store'

import { useGames } from '../../../hooks/useGames'
import { ItemGame } from '../../../store/store'
import { Button } from '../Button/Button'

export function MainGames() {
  const { selectedGameId } = ItemGame()

  const { data } = useGames()

  const game = data?.find((g) => g?.id === selectedGameId)

  const { purchase, isPurchased, unpurchase } = useStoreLibrary()

  if (!game) return <div>Loading...</div>

  return (
    <div className="pt-10 pl-2.5 w-full flex gap-5">
      {/* TODO: доделать адаптацию */}
      {/* адаптация под разные размеры экрана */}
      <div className="relative overflow-hidden rounded-3xl shrink-0 xl:w-106 xl:h-60 lg:w-106 lg:h-60 md:w-80 md:h-48 sm:w-64 sm:h-40 ">
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
        <h1 className="font-bold text-text font-montserrat xl:text-4xl lg:text-4xl md:text-3xl sm:text-2xl text-xl">
          {game?.title}
        </h1>
        {/* <p className="text-[18px] text-gray-400">{game?.creator}</p> */}

        <div className="flex gap-2 mt-5">
          <Button
            title={isPurchased(game.id) ? 'In Library' : 'Buy Now'}
            isPrimary
            click={() =>
              isPurchased(game.id) ? unpurchase(game.id) : purchase(game.id)
            }
          />
          <Button title="Wishlist" icon={<PlusCircle />} />
        </div>
      </div>
    </div>
  )
}
