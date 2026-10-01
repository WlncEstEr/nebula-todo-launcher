import { Heart, HeartOffIcon, MoreHorizontal } from 'lucide-react'
import type { MouseEvent } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { buildPath } from '@/config/routing.config'

import type { IGame } from '@/types/games.types'

interface VerticalCardProps {
  game: IGame
  onMenuClick: (e: MouseEvent, game: IGame) => void
}

export function VerticalCard({ game, onMenuClick }: VerticalCardProps) {
  const navigate = useNavigate()

  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative rounded-lg w-50 h-75 cursor-pointer">
      <div className="w-full h-5/6 rounded-t-lg overflow-hidden relative">
        <img
          src={game.image}
          alt={game.id}
          className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-300 ease-in-out"
        />
        <div
          className="absolute top-3 right-3 cursor-pointer z-10 active:scale-90 transition-transform duration-150"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          // onClick={(e) => {
          //   e.stopPropagation()
          //   updateGame(game.id, { isFavorite: !game.isFavorite })
          // }}
        >
          {/* TODO: Что-ниюуть придумать с isFavorite */}
          {game.isFavorite ? (
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
              void navigate(buildPath('DETAILS', { slug: game.id }))
            }
            className="text-text text-[17px] font-semibold mt-1 px-1 line-clamp-1 break-all w-full"
          >
            {game.title}
          </h3>

          <MoreHorizontal
            className="text-text cursor-pointer"
            onClick={(e) => onMenuClick(e, game)}
          />
        </div>
        <div className="text-text text-[13px] font-normal px-1 flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
          {/* {game.isInstaller ? (
            <>
              <ArrowDownToLine size={12} />
              Установить
            </>
          ) : (
            <>
              <Check size={12} />
              Установлено
            </>
          )} */}
        </div>
      </div>
    </div>
  )
}
