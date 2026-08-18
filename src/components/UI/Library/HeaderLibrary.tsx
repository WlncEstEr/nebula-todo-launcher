import cn from 'clsx'
import { Atom, LayoutGrid, List } from 'lucide-react'

interface HeaderProps {
  isGrid: boolean
  setIsGrid: (value: boolean) => void
}

export function HeaderLibrary({ isGrid, setIsGrid }: HeaderProps) {
  return (
    <div className="flex rounded-r-3xl absolute top-8 left-0 px-6 justify-between w-full">
      <div className="flex items-center gap-1 text-[#faa7fa] text-xl font-semibold">
        <Atom size={20} />
        <span>Nebula</span>
      </div>
      <div className="w-fit flex gap-3.5 items-center">
        <LayoutGrid
          className={cn(
            isGrid ? 'text-[#faa7fa]' : 'text-white',
            'cursor-pointer'
          )}
          onClick={() => setIsGrid(true)}
        />
        <List
          className={cn(
            !isGrid ? 'text-[#faa7fa]' : 'text-white',
            'cursor-pointer'
          )}
          onClick={() => setIsGrid(false)}
        />
      </div>
    </div>
  )
}
