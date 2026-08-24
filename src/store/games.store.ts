import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { IGame } from '../data/games.data'
import { gamesData } from '../data/games.data'

interface IGamesStore {
  games: IGame[]
  getGame: (id: string) => IGame | undefined
  addGame: (game: IGame) => void
  updateGame: (id: string, patch: Partial<IGame>) => void
  deleteGame: (id: string) => void
  overwriteAll: (games: IGame[]) => void
  resetToDefault: () => void
}

export const useStoreGames = create<IGamesStore>()(
  persist(
    (set, get) => ({
      games: gamesData,

      getGame: (id) => get().games.find((g) => g.id === id),

      addGame: (game) =>
        set((state) => ({
          games: state.games.some((g) => g.id === game.id)
            ? state.games
            : [...state.games, game]
        })),

      updateGame: (id, patch) =>
        set((state) => ({
          games: state.games.map((g) => (g.id === id ? { ...g, ...patch } : g))
        })),

      deleteGame: (id) =>
        set((state) => ({
          games: state.games.filter((g) => g.id !== id)
        })),

      overwriteAll: (games) => set({ games }),

      resetToDefault: () => set({ games: gamesData })
    }),
    { name: 'nebula-games-db' } // ключ в localStorage
  )
)
