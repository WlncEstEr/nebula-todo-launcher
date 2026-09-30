import { useEffect } from 'react'
import type { To } from 'react-router'
import { useNavigate } from 'react-router'
import { gamesData } from '../data/games.data'
import { menuData } from '../data/menu.data'
import { useFocus } from '../store/focus.store'

interface SidebarItem {
  id: string
  to: To // тип из react-router — убирает no-unsafe-argument
}

const quickGames = gamesData
  .filter((g) => g.isFavorite)
  .toSorted((a, b) => b.hoursInGame - a.hoursInGame)

const sidebarItems: SidebarItem[] = [
  ...menuData.map((i) => ({
    id: i.id,
    to: i.id === 'store' ? '/' : `/${i.id}`
  })),
  ...quickGames.map((g) => ({ id: g.id, to: `/game/${g.id}` }))
]

export function useKeyboardNavigation() {
  const navigate = useNavigate()
  const { zone, dashboardIndex, setZone, setDashboardIndex } = useFocus()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.repeat) return

      const target = e.target as HTMLElement
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable
      )
        return

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowUp': {
          e.preventDefault()
          // вертикаль → дашборд
          if (zone !== 'dashboard') setZone('dashboard')
          setDashboardIndex(
            e.key === 'ArrowDown'
              ? Math.min(dashboardIndex + 1, sidebarItems.length - 1)
              : Math.max(0, dashboardIndex - 1)
          )
          break
        }
        case 'ArrowLeft':
        case 'ArrowRight': {
          if (zone === 'dashboard') {
            e.preventDefault()
            // горизонталь → главный экран (свайпер отреагирует сам)
            setZone('main')
          }
          break
        }
        case 'Enter':
          e.preventDefault()
          if (zone === 'dashboard') {
            void navigate(sidebarItems[dashboardIndex].to)
          }
          // Enter в main обрабатывает свайпер
          break
      }
    }
    window.addEventListener('keydown', handler, true) // capture: срабатывает раньше слушателя свайпера
    return () => window.removeEventListener('keydown', handler, true)
  }, [zone, dashboardIndex, navigate, setZone, setDashboardIndex])
}
