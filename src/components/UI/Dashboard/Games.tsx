import cn from 'clsx'
import { toast } from 'react-toastify'
import { menuData } from '../../../data/menu.data'
import { useFocus } from '../../../store/focus.store'
import { useStoreGames } from '../../../store/games.store'
import { ItemGame } from '../../../store/store'

export function Games() {
  const { zone, dashboardIndex } = useFocus()

  const { setDownloadMenu } = ItemGame()

  const quickGames = useStoreGames((s) => s.games)
    .filter((g) => g.isFavorite)
    .toSorted((a, b) => b.hoursInGame - a.hoursInGame)

  const OFFSET = menuData.length
  return (
    <div>
      <h1 className="uppercase text-[11px]">QuicklyPlay</h1>
      <div className="flex flex-col gap-1 mt-2">
        {/* {quickPlayData.map((game) => (
          <Link key={game.id} to={`/game/${game.id}`}>
            <div className="flex items-center gap-1.5 px-1 py-1 rounded-xl transition-colors ease-in-out duration-300 hover:bg-hover cursor-pointer">
              <img
                src={game.image}
                alt={game.title}
                className="w-5.5 h-5.5 rounded-lg"
              />
              <span className="text-[13px] text-text">{game.title}</span>
            </div>
          </Link>
        ))} */}

        {/* TODO: МОЖНО СДЕЛАТЬ ВЫБОРКУ ИЗ СПИСКА ИГР БИБЛИОТЕКИ ПО НАИБОЛЬШЕМУ КОЛ-ВО ЧАСОВ / ИЛИ ЗДЕСЬ ОТОБРАЖАЮТСЯ ИГРЫ (ДО 5) КОТОРЫЕ ДОБАВЛЕНЫ В ИЗБРАННЫЕ */}

        {quickGames.map((game, i) => (
          <div
            key={game.id}
            // TODO: Пофиксить функцию открытия окна установки, когда будет реализованно через tanstack query и локальную БД
            onClick={() =>
              !game.isInstaller
                ? toast.success('Game starting...')
                : setDownloadMenu(game.id)
            }
            className={cn(
              'flex items-center gap-1.5 px-1 py-1 rounded-xl transition-colors ease-in-out duration-300 cursor-pointer',
              {
                'bg-hover text-white font-semibold':
                  zone === 'dashboard' && dashboardIndex === OFFSET + i,
                'text-text hover:bg-hover': true
              }
            )}
          >
            <img
              src={game.smallImage}
              alt={game.title}
              className="w-5.5 h-5.5 rounded-sm"
            />
            <span className="text-[14px] text-text">{game.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
