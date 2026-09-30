import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ILibraryStore {
  purchasedIds: string[]
  isPurchased: (id: string) => boolean
  purchase: (id: string) => void
  unpurchase: (id: string) => void
}

export const useStoreLibrary = create<ILibraryStore>()(
  persist(
    (set, get) => ({
      purchasedIds: [],
      isPurchased: (id) => get().purchasedIds.includes(id),
      purchase: (id) =>
        set((s) => ({
          purchasedIds: s.purchasedIds.includes(id)
            ? s.purchasedIds
            : [...s.purchasedIds, id]
        })),
      unpurchase: (id) =>
        set((s) => ({
          purchasedIds: s.purchasedIds.filter((x) => x !== id)
        }))
    }),
    { name: 'library-storage' }
  )
)
