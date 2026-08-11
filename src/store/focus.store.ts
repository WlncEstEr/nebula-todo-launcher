import { create } from 'zustand'

export type FocusZone = 'dashboard' | 'main'

interface IFocusStore {
  zone: FocusZone
  dashboardIndex: number // активный пункт в дашборде
  setZone: (zone: FocusZone) => void
  setDashboardIndex: (i: number) => void
}

export const useFocus = create<IFocusStore>()((set) => ({
  zone: 'main',
  dashboardIndex: 0,
  setZone: (zone) => set({ zone }),
  setDashboardIndex: (dashboardIndex) => set({ dashboardIndex })
}))
