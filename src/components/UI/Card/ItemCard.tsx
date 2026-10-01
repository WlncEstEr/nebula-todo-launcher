import cn from 'clsx'

import type { IGame } from '@/types/games.types'

interface IItemCard {
  game: IGame
  isActive?: boolean
  progress?: number
  onClick?: () => void
}

// ПРОДОЛЖИТЬ АДАПТИРОВАТЬ ПОД RAWG API С ЭТОЙ КАРТОЧКИ

export function ItemCard({
  game,
  isActive = false,
  progress = 0,
  onClick
}: IItemCard) {
  // const isBuy = useStoreLibrary((s) => s.purchasedIds.includes(game.id))
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex flex-col items-center w-70 transition-all p-1 cursor-pointer',
        {
          'border-2 border-accent rounded-xl': isActive,
          'opacity-40 scale-95 text-gray-400': !isActive
        }
      )}
    >
      {/* Контейнер с изображением и прогресс-баром */}
      <div className="relative w-full h-32 rounded overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className={cn(
            'object-cover h-full w-full transition-all duration-300',
            {
              'opacity-100': isActive
            }
          )}
        />

        {/* Прогресс-бар поверх изображения (только для активной карточки) */}
        {isActive && (
          <>
            {/* Оверлей прогресса */}
            <div
              className="absolute bottom-0 left-0 h-1.5 bg-accent"
              style={{ width: `${progress}%` }}
            />

            {/* Дополнительный визуальный эффект */}
            <div
              className="absolute inset-0 bg-linear-to-r from-[#55555500] to-accent/40 pointer-events-none"
              style={{
                clipPath: `inset(0 ${100 - progress}% 0 0)`
              }}
            />
            {/* {isBuy ? (
              <span className="text-green-500 text-sm font-bold">
                Purchased
              </span>
            ) : (
              <div className="absolute right-3 bottom-3">
                <FieldDiscount price={0} oldPrice={0} />
              </div>
            )} */}
          </>
        )}
      </div>

      <div className="flex flex-col justify-start w-full">
        <div>
          <h3
            className={cn('text-[18px] font-semibold transition-colors', {
              'text-white': isActive
            })}
          >
            {game.title}
          </h3>
          <div className="flex justify-start gap-2">
            <p
              className={cn('ml-1 text-[11px] transition-colors', {
                'text-gray-300': isActive
              })}
            >
              {game.rating}%
            </p>
            <span>*</span>
            <p
              className={cn('text-[11px] transition-colors', {
                'text-gray-300': isActive
              })}
            >
              {game.genres.map((gen) => gen.name).join(', ') || 'No genres'}
            </p>
            <span>*</span>
            <p
              className={cn('text-[12px] transition-colors', {
                'text-gray-300': isActive
              })}
            >
              {game.platforms.map((plat) => plat) || 'No platforms'}
            </p>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
