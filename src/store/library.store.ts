import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LibraryEntry {
  isFavorite: boolean
}

interface ILibraryStore {
  library: Record<string, LibraryEntry> // ключ = id игры
  isPurchased: (id: string) => boolean
  purchase: (id: string) => void
  remove: (id: string) => void
  toggleFavorite: (id: string) => void
}

export const useStoreLibrary = create<ILibraryStore>()(
  persist(
    (set, get) => ({
      library: {},
      isPurchased: (id) => id in get().library,
      purchase: (id) =>
        set((s) =>
          id in s.library
            ? s
            : { library: { ...s.library, [id]: { isFavorite: false } } }
        ),
      remove: (id) =>
        set((s) => {
          const { [id]: _removed, ...rest } = s.library
          return { library: rest }
        }),
      toggleFavorite: (id) =>
        set((s) =>
          s.library[id]
            ? {
                library: {
                  ...s.library,
                  [id]: { isFavorite: !s.library[id].isFavorite }
                }
              }
            : s
        )
    }),
    { name: 'library-storage' }
  )
)
