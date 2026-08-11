import { ArrowDownToLine, MoreHorizontal } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { IGame } from '../../../data/games.data'
import { ContextMenu } from '../Context/ContextMenu'

interface VerticalCardProps {
  games: IGame
  openMenuId: string | null
  setOpenMenuId: (id: string | null) => void
}

export function VerticalCard({
  games,
  openMenuId,
  setOpenMenuId
}: VerticalCardProps) {
  const isOpen = openMenuId === games.id
  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setOpenMenuId(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, setOpenMenuId])

  return (
    <div ref={cardRef} className="relative rounded-lg w-50 h-75 cursor-pointer">
      <div className="w-full h-5/6 rounded-t-lg overflow-hidden">
        <img
          src={games.vertImage}
          alt={games.id}
          className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </div>

      <div>
        <div className="relative flex justify-between items-end">
          <h3 className="text-text text-[17px] font-semibold mt-1 px-1 line-clamp-1 break-all w-full">
            {games.title}
          </h3>

          <MoreHorizontal
            className="text-text"
            onClick={() => setOpenMenuId(isOpen ? null : games.id)}
          />
        </div>
        <div className="text-text text-[13px] font-normal px-1 flex items-center gap-1 ">
          <ArrowDownToLine size={12} />
          Установить
        </div>
      </div>

      {isOpen && (
        <div className="absolute w-full px-2 py-1 top-38 left-44 bg-[#303034] rounded-xl z-10">
          <ContextMenu />
        </div>
      )}
    </div>
  )
}
