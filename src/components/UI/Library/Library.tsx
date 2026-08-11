import { useState } from 'react'
import { gamesData } from '../../../data/games.data'
import { DownloadMenu } from '../Context/DownloadMenu'
import { HeaderLibrary } from './HeaderLibrary'
import { VerticalCard } from './VerticalCard'

export function Library() {
  const [isGrid, setIsGrid] = useState(true)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  return (
    <div className="flex flex-col w-full h-full relative rounded-r-3xl bg-bg">
      <div className="flex text-white ">
        <HeaderLibrary isGrid={isGrid} setIsGrid={setIsGrid} />
      </div>
      <div className="absolute left-0 top-18 px-12 w-full grid grid-cols-1 gap-4 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {isGrid ? (
          <>
            {gamesData.map((game) => (
              <VerticalCard
                key={game.id}
                games={game}
                openMenuId={openMenuId}
                setOpenMenuId={setOpenMenuId}
              />
            ))}
          </>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="bg-bg rounded-lg p-4">List Item 1</div>
          </div>
        )}
      </div>
      <div className="absolute w-3/4 h-1/2 top-50% right-50% bg-bg/96 rounded-xl z-10 transform translate-y-1/3 border border-white/30">
        <DownloadMenu />
      </div>
    </div>
  )
}

{
  /* <div className="grid grid-rows-[4fr_3fr_1fr]  "></div> */
}
