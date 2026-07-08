import type { ReactNode } from 'react'
import { Dashboard } from './components/UI/Dashboard/Dashboard'

interface LayoutProps {
	children: ReactNode
}

export function Layout({ children }: LayoutProps) {
	return (
		<div className="w-full h-full px-90 py-10 ">
			<div className="grid grid-cols-[1fr_4fr] w-287.5 h-[830px] rounded-3xl shadow-2xl shadow-white">
				<Dashboard />
				{children}
			</div>
		</div>
	)
}
