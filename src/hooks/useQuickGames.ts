import { useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { useStoreLibrary } from '@/store/library.store'

import { usePurchasedGames } from '@/hooks/useQueries'

export function useQuickGames() {
  const ids = useStoreLibrary(useShallow((s) => Object.keys(s.library)))
  const library = useStoreLibrary((s) => s.library)
  const { games, isLoading } = usePurchasedGames(ids)

  const quickGames = useMemo(
    () =>
      games
        .filter((g) => g && library[g.id]?.isFavorite)
        .toSorted((a, b) => b.hoursInGame - a.hoursInGame),
    [games, library]
  )

  return { quickGames, isLoading }
}
