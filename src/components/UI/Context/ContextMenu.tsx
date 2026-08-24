import type { IGame } from '../../../data/games.data'
import { useStoreGames } from '../../../store/games.store'

interface IContextMenu {
  game: IGame
  click: () => void
}

export function ContextMenu({ game, click }: IContextMenu) {
  const { updateGame } = useStoreGames()

  console.log(game)

  return (
    <div className="bg-[#333336] rounded-lg p-1">
      <h2
        className="text-text text-[15px] font-normal px-2 hover:bg-[#57575e] hover:rounded-lg cursor-pointer"
        onClick={click}
      >
        Перейти на страницу в магазине
      </h2>
      <h2 className="text-text text-[15px] font-normal px-2 hover:bg-[#57575e] hover:rounded-lg cursor-pointer">
        Добавить в избранное
      </h2>
      {!game.isInstaller && (
        <>
          <div className="w-full h-px bg-[#919191] my-1" />
          <h2
            className="text-text text-[15px] font-normal px-2 hover:bg-[#57575e] hover:rounded-lg cursor-pointer"
            onClick={() =>
              updateGame(game.id, { isInstaller: !game.isInstaller })
            }
          >
            Удалить с устройства
          </h2>
        </>
      )}
    </div>
  )
}
