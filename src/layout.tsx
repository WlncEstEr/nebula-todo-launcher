import { Outlet } from 'react-router'
import { Dashboard } from './components/UI/Dashboard/Dashboard'
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'

export function Layout() {
  useKeyboardNavigation()
  return (
    <div className="w-full h-full flex justify-center items-center my-auto">
      <div className="grid grid-cols-[1fr_4fr] w-6/9 h-[80vh] rounded-3xl shadow-2xl shadow-white">
        <Dashboard />
        <Outlet />
      </div>
    </div>
  )
}
