import { Outlet } from 'react-router'
import { Dashboard } from './components/UI/Dashboard/Dashboard'
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'

export function Layout() {
  useKeyboardNavigation()
  return (
    <div className="w-full h-full px-90 py-10 ">
      <div className="grid grid-cols-[1fr_4fr] w-287.5 h-[830px] rounded-3xl shadow-2xl shadow-white">
        <Dashboard />
        <Outlet />
      </div>
    </div>
  )
}
