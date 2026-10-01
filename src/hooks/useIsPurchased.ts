import { useStoreLibrary } from '@/store/library.store'

export const useIsPurchased = (id?: string) =>
  useStoreLibrary((s) => (id ? id in s.library : false))

export const useIsFavorite = (id?: string) =>
  useStoreLibrary((s) => (id ? (s.library[id]?.isFavorite ?? false) : false))
