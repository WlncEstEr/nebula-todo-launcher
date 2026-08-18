import cn from 'clsx'
import { NavLink } from 'react-router'
import { gamesData } from '../../../data/games.data'
import { menuData } from '../../../data/menu.data'
import { useFocus } from '../../../store/focus.store'
export function Games() {
  const { zone, dashboardIndex } = useFocus()
  const OFFSET = menuData.length // 3

  const quicklyGame = gamesData.filter((g) => g.isBuy && g.isInstaller)

  return (
    <div>
      <h1 className="uppercase text-[11px]">Quickplay</h1>
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

        {quicklyGame.map((game, i) => (
          <NavLink
            key={game.id}
            to={`/game/${game.id}`}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-1.5 px-1 py-1 rounded-xl transition-colors ease-in-out duration-300 cursor-pointer',
                {
                  'bg-hover text-white font-semibold':
                    zone === 'dashboard' && dashboardIndex === OFFSET + i
                },
                {
                  'bg-hover text-white font-semibold': isActive,
                  'text-text hover:bg-hover': !isActive
                }
              )
            }
          >
            <img
              src={game.smallImage}
              alt={game.title}
              className="w-5.5 h-5.5 rounded-sm"
            />
            <span className="text-[14px] text-text">{game.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}
