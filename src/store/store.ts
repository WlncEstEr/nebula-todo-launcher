import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface IItemgame {
  selectedGameId: string | null
  favoriteIds: string[]
  installedIds: string[]
  lastId: number
  downloadMenu: string
  setDownloadMenu: (id: string) => void
  setSelectedGameId: (id: string | null) => void
  setLastId: (id: number) => void
  toggleInstalled: (id: string) => void
  toggleFavorite: (id: string) => void
}

export const ItemGame = create<IItemgame>()(
  persist(
    (set) => ({
      selectedGameId: null,
      favoriteIds: [],
      installedIds: [],
      lastId: 0,
      downloadMenu: '',

      setSelectedGameId: (id) =>
        set((state) => ({ ...state, selectedGameId: id })),

      setDownloadMenu: (id) => set((state) => ({ ...state, downloadMenu: id })),

      toggleFavorite: (id) =>
        set((state) => ({
          ...state,
          favoriteIds: state.favoriteIds.includes(id)
            ? state.favoriteIds.filter((f) => f !== id)
            : [...state.favoriteIds, id]
        })),

      toggleInstalled: (id) =>
        set((state) => ({
          ...state,
          installedIds: state.installedIds.includes(id)
            ? state.installedIds.filter((f) => f !== id)
            : [...state.installedIds, id]
        })),

      setLastId: (id) => set((state) => ({ ...state, lastId: id }))
    }),
    {
      name: 'nebula-store',
      partialize: (state) => ({
        favoriteIds: state.favoriteIds,
        installedIds: state.installedIds
      })
    }
  )
)

export interface IIsKanban {
  isKanban: boolean
  setIsKanban: (isKanban: boolean) => void
}

export const IsKanban = create<IIsKanban>()((set) => ({
  isKanban: true,
  setIsKanban: (isKanban: boolean) => set((state) => ({ ...state, isKanban }))
}))
