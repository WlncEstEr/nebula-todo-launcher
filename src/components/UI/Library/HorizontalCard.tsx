import {
  ArrowDownToLine,
  Heart,
  HeartOffIcon,
  MoreHorizontal
} from 'lucide-react'
import { useState, type MouseEvent } from 'react'
import type { IGame } from '../../../data/games.data'
import { ItemGame } from '../../../store/store'

interface HorizontalCardProps {
  game: IGame
  onMenuClick: (e: MouseEvent, game: IGame) => void
  onInstall: () => void
}

export function HorizontalCard({
  game,
  onMenuClick,
  onInstall
}: HorizontalCardProps) {
  const { favoriteIds, toggleFavorite } = ItemGame()
  const isFavorite = favoriteIds.includes(game.id)

  const [isHovered, setIsHovered] = useState(false)

  return (
    <tr className="px-3 py-2 bg-bg border border-text/10 hover:bg-[#0c131d] w-full rounded-2xl flex justify-between items-center text-center">
      <td className="w-70">
        <div className="flex h-full justify-between items-center gap-3 text-start">
          <div className="flex h-full items-center gap-3">
            <img
              src={game.vertImage}
              alt={game.id}
              className="w-14 rounded-xl"
            />

            <div>
              <h2 className="text-text font-bold line-clamp-1">{game.title}</h2>
              <div
                onClick={onInstall}
                className="flex items-center gap-1 text-[13px] font-medium cursor-pointer"
              >
                <ArrowDownToLine size={12} />
                Установить
              </div>
            </div>
          </div>
          <div
            className="cursor-pointer z-10 active:scale-90 transition-transform duration-150"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
              e.stopPropagation()
              toggleFavorite(game.id)
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
      </td>
      <td className="min-w-25">-</td>
      <td className="min-w-25">-</td>
      <td className="min-w-25">{game.hoursInGame}</td>
      <td className="min-w-25">{game.gameSize}</td>
      <td className="min-w-5 cursor-pointer">
        <MoreHorizontal onClick={(e) => onMenuClick(e, game)} />
      </td>
    </tr>
  )
}
