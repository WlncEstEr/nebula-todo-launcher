import { Handshake, LayoutGrid, ShoppingBag } from 'lucide-react'

export interface MenuItem {
	id: string
	title: string
	icon: React.ReactNode
}

export const menuData: MenuItem[] = [
	{
		id: 'store',
		title: 'Store',
		icon: <ShoppingBag />
	},
	{
		id: 'library',
		title: 'Library',
		icon: <LayoutGrid />
	},
	{
		id: 'community',
		title: 'Community',
		icon: <Handshake />
	}
]
