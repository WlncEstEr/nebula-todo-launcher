import { Friends } from './Friends'
import { Games } from './Games'
import { Menu } from './Menu'

export function Dashboard() {
  return (
    <div className="bg-bg rounded-l-3xl grid grid-rows-[3fr_5fr_2fr] p-4 h-[80vh]">
      <Menu />
      <Games />
      <Friends />
    </div>
  )
}
