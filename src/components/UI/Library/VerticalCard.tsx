import {
  ArrowDownToLine,
  Heart,
  HeartOffIcon,
  MoreHorizontal
} from 'lucide-react'
import type { MouseEvent } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { buildPath } from '../../../config/routing.config'
import type { IGame } from '../../../data/games.data'
import { ItemGame } from '../../../store/store'

interface VerticalCardProps {
  games: IGame
  onMenuClick: (e: MouseEvent, game: IGame) => void
  onInstall: () => void
}

export function VerticalCard({
  games,
  onMenuClick,
  onInstall
}: VerticalCardProps) {
  const navigate = useNavigate()

  const { favoriteIds, toggleFavorite } = ItemGame()
  const isFavorite = favoriteIds.includes(games.id)

  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative rounded-lg w-50 h-75 cursor-pointer">
      <div
        onClick={() => void navigate(buildPath('DETAILS', { slug: games.id }))}
        className="w-full h-5/6 rounded-t-lg overflow-hidden relative"
      >
        <img
          src={games.vertImage}
          alt={games.id}
          className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-300 ease-in-out"
        />
        <div
          className="absolute top-3 right-3 cursor-pointer z-10 active:scale-90 transition-transform duration-150"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(games.id)
          }}
        >
          {isFavorite ? (
            isHovered ? (
              <HeartOffIcon
                key="off"
                className="text-text animate-pop"
                size={20}
              />
            ) : (
              <Heart
                key="on"
                className="text-red-500 fill-red-500 animate-pop"
                size={20}
              />
            )
          ) : isHovered ? (
            <Heart
              key="hover"
              className="text-red-500 fill-red-500 animate-pop"
              size={20}
            />
          ) : (
            <Heart key="idle" className="text-text" size={20} />
          )}
        </div>
      </div>

      <div>
        <div className="relative flex justify-between items-end">
          <h3
            onClick={() =>
              void navigate(buildPath('DETAILS', { slug: games.id }))
            }
            className="text-text text-[17px] font-semibold mt-1 px-1 line-clamp-1 break-all w-full"
          >
            {games.title}
          </h3>

          <MoreHorizontal
            className="text-text cursor-pointer"
            onClick={(e) => onMenuClick(e, games)}
          />
        </div>
        <div
          className="text-text text-[13px] font-normal px-1 flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          onClick={onInstall}
        >
          <ArrowDownToLine size={12} />
          Установить
        </div>
      </div>
    </div>
  )
}
