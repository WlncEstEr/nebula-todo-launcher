import { Folder } from 'lucide-react'
import { useRef, useState } from 'react'
import type { IGame } from '../../../data/games.data'
import { Button } from '../Button/Button'

interface DownloadMenuProps {
  games: IGame
  onClose: () => void
}

interface IChecked {
  label: boolean
  autosave: boolean
}

export function DownloadMenu({ games, onClose }: DownloadMenuProps) {
  const [checked, setChecked] = useState<IChecked>({
    label: true,
    autosave: true
  })

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="p-3 w-full h-full grid grid-cols-[1.5fr_4fr]">
      <div className="flex justify-center items-start">
        <div className="w-32 h-48 rounded-lg overflow-hidden shrink-0">
          <img
            src={games.vertImage}
            alt={games.id}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div>
        <h1 className="text-text text-2xl font-extrabold mt-1 px-1 line-clamp-1 break-all w-full">
          Выберите путь для установки
        </h1>
        <div className="text-gray-400 text-[15px] font-bold mt-5 px-1 flex flex-col  ">
          <p>Размер загрузки: {games ? games?.gameSize : 0} GB</p>
          <p>Требуемое место: {games ? games?.finallySize : 0} GB</p>
        </div>
        <div className="flex flex-col mt-5 px-1">
          <span className="text-gray-400 text-sm font-normal">Папка</span>
          <div className="flex gap-2 me-2 items-center relative">
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 py-1.25">
              <Folder />
            </div>
            <input
              type="text"
              className="bg-bg border border-gray-500 rounded-lg h-8 w-full pl-3 text-text text-sm font-normal outline-none"
              placeholder={`      C:\\Program Files\\Nebula Games\\`}
              readOnly
            />
            <button className="bg-bg text-text text-[13px] font-normal px-3 py-1.25 border border-gray-500 rounded-lg hover:bg-gray-500 transition-colors duration-300 ease-in-out cursor-pointer whitespace-nowrap">
              Все игры
            </button>
          </div>
          <div className="text-gray-400 text-sm font-normal mt-2 whitespace-nowrap">
            Путь: C:\Program Files\Nebula Games\
            {games ? games?.title : ''}
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <div>
            <input type="checkbox" id="desktopShortcut" className="hidden" />
            <label
              htmlFor="desktopShortcut"
              className="flex items-center gap-2 px-1 cursor-pointer"
            >
              <input
                type="checkbox"
                id="desktopShortcut"
                checked={checked.label}
                onChange={() =>
                  setChecked({ ...checked, label: !checked.label })
                }
              />
              <span className="text-gray-400 text-sm font-normal">
                Сохранять файлы автообновления в эту папку
              </span>
            </label>
          </div>
          <div>
            <input type="checkbox" id="desktopShortcut" className="hidden" />
            <label
              htmlFor="desktopShortcut"
              className="flex items-center gap-2 px-1 cursor-pointer"
            >
              <input
                type="checkbox"
                ref={inputRef}
                id="desktopShortcut"
                checked={checked.autosave}
                onChange={() =>
                  setChecked({ ...checked, autosave: !checked.autosave })
                }
              />
              <span className="text-gray-400 text-sm font-normal">
                Создать ярлык
              </span>
            </label>
          </div>
          <div className="flex gap-2 mt-5 px-1 w-full">
            <Button title="Отмена" className="w-full" click={onClose} />
            <Button isPrimary title="Установить" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
