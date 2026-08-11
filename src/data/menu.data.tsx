import { Handshake, LayoutGrid, ShoppingBag } from 'lucide-react'
import { ROUTES } from '../config/routing.config'

export interface MenuItem {
  id: string
  title: string
  icon: React.ReactElement<{ size?: number }>
  route: string
}

export const menuData: MenuItem[] = [
  {
    id: '',
    title: 'Store',
    icon: <ShoppingBag />,
    route: ROUTES.HOME
  },
  {
    id: 'library',
    title: 'Library',
    icon: <LayoutGrid />,
    route: ROUTES.LIBRARY
  },
  {
    id: 'community',
    title: 'Community',
    icon: <Handshake />,
    route: ROUTES.COMMUNITY
  }
]
