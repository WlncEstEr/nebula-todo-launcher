import type { MouseEvent } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { useStoreLibrary } from '@/store/library.store'
import { IsKanban, ItemGame } from '@/store/store'

import { usePurchasedGames } from '@/hooks/useQueries'

import { buildPath } from '@/config/routing.config'

import type { IGame } from '@/types/games.types'

import { ContextMenu } from '../Context/ContextMenu'
import { LoaderCircl } from '../Loader'

import { HeaderLibrary } from './HeaderLibrary'
import { HorizontalCard } from './HorizontalCard'
import { VerticalCard } from './VerticalCard'

export function Library() {
  const { isKanban, setIsKanban } = IsKanban()
  const { downloadMenu, setDownloadMenu } = ItemGame()

  const [menu, setMenu] = useState<{ id: string; x: number; y: number } | null>(
    null
  )
  // const [downloadGameId, setDownloadGameId] = useState<string | null>(null)

  // const isBuy = useStoreLibrary((s) => s.purchasedIds.includes(menu?.id ?? ''))

  const ids = useStoreLibrary(useShallow((s) => Object.keys(s.library)))
  const library = useStoreLibrary((s) => s.library)

  const { games: Games, isLoading } = usePurchasedGames(ids)
  console.log(Games)
  const navigate = useNavigate()

  const openMenu = (e: MouseEvent, game: IGame) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMenu({ id: game.id, x: rect.left, y: rect.bottom + 4 })
  }
  if (isLoading) {
    return <LoaderCircl />
  }
  return (
    <div className="flex flex-col w-full h-full relative rounded-r-3xl bg-bg">
      <div className="flex text-white ">
        <HeaderLibrary isGrid={isKanban} setIsGrid={setIsKanban} />
      </div>
      <div className="absolute left-0 top-18 bottom-0 px-4 w-full overflow-y-auto">
        {isKanban ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 w-full">
            {Games.map((game) => (
              <VerticalCard key={game.id} game={game} onMenuClick={openMenu} />
            ))}
          </div>
        ) : (
          <table className="w-full flex flex-col gap-1">
            <tr className="w-full flex justify-between text-sm font-semibold text-center px-3">
              <td className="min-w-70 flex items-start">Заголовок</td>
              <td className="min-w-25">Достижения</td>
              <td className="min-w-25">Дополнения</td>
              <td className="min-w-25">Время в игре</td>
              <td className="min-w-25">Размер</td>
              <td className="min-w-5"></td>
            </tr>
            {Games.map((game) => (
              <HorizontalCard
                key={game.id}
                game={game}
                onMenuClick={openMenu}
                onInstall={() => setDownloadMenu(game.id)}
              />
            ))}
          </table>
        )}
      </div>

      {menu && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setMenu(null)} />
          <div
            className="fixed z-20"
            style={{ top: menu.y - 120, left: menu.x - 240 }}
          >
            <ContextMenu
              game={Games.find((g) => g.id === menu.id)!}
              click={() => {
                setMenu(null)
                void navigate(
                  buildPath('DETAILS', {
                    slug: Games.find((g) => g.id === menu.id)!.id
                  })
                )
              }}
            />
          </div>
        </>
      )}

      {downloadMenu && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/50"
          onClick={() => setDownloadMenu('')}
        >
          <div
            className="w-3/4 h-1/2 bg-bg rounded-xl border border-white/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <DownloadMenu
              games={downloadGame}
              onClose={() => setDownloadMenu('')}
            /> */}
          </div>
        </div>
      )}
    </div>
  )
}
