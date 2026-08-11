import { Folder } from 'lucide-react'
import type { IGame } from '../../../data/games.data'

interface DownloadMenuProps {
  games: IGame
}

export function DownloadMenu({ games }: DownloadMenuProps) {
  return (
    <div className="p-3 w-full h-full grid grid-cols-[1.5fr_4fr]">
      <div className="flex justify-center items-start">
        <img
          src="/public/images/vertical/vert-hogwarts-legacy.jpg"
          alt={games?.id}
          className="w-9/10 object-cover rounded-lg"
        />
        {/* <img src={games?.vertImage} alt={games?.id} /> */}
      </div>
      <div>
        <h1 className="text-text text-2xl font-bold mt-1 px-1 line-clamp-1 break-all w-full">
          Выберите место для установки игры
        </h1>
        <div className="text-gray-400 text-base font-normal mt-5 px-1 flex flex-col  ">
          <p>Размер загрузки: {games ? games?.gameSize : 0} GB</p>
          <p>Требуемое место: {games ? games?.finallySize : 0} GB</p>
        </div>
        <div className="flex flex-col  mt-5 px-1">
          <span className="text-gray-400 text-sm font-normal">Папка</span>
          <div className="flex gap-2 mt-2 items-center relative">
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 ">
              <Folder />
            </div>
            <input
              type="text"
              className="bg-bg border border-gray-500 rounded-lg h-8 w-full px-2"
              placeholder={`      C:\\Program Files\\Nebula Games\\`}
            />
            <button className="bg-bg text-text text-[13px] font-normal px-4 py-1.25 border border-gray-500 rounded-lg hover:bg-gray-500 transition-colors duration-300 ease-in-out cursor-pointer">
              Обзор
            </button>
          </div>
          <div className="text-gray-400 text-sm font-normal mt-2">
            Путь: C:\Program Files\Nebula Games\
            {games ? games?.title : ''}
          </div>
        </div>
        {/* 2 кнопки которые как флаги */}
        <div>
          <input type="checkbox" id="desktopShortcut" className="hidden" />
          <label
            htmlFor="desktopShortcut"
            className="flex items-center gap-2 mt-5 px-1 cursor-pointer"
          >
            <input
              type="checkbox"
              id="desktopShortcut"
              className="w-4 h-4 bg-inherit border border-gray-500 rounded-sm cursor-pointer"
            />
            <span className="w-4 h-4 border border-gray-500 rounded-sm flex items-center justify-center"></span>
            <span className="text-gray-400 text-sm font-normal">
              Создать ярлык на рабочем столе
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}
