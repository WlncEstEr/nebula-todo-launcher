import { useQueries } from '@tanstack/react-query'

import { getOneGame } from '@/service/games.service'

import type { IGames } from '@/types/games.types'

export function usePurchasedGames(ids: string[]) {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: ['game', id],
      queryFn: () => getOneGame(id),
      staleTime: 1000 * 60 * 60 // игры почти не меняются
    })),
    combine: (results) => ({
      games: results
        .map((r) => r.data)
        .filter((g): g is IGames => g !== undefined),
      isLoading: results.some((r) => r.isLoading)
    })
  })
}
