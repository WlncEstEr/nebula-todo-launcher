import { useQuery } from '@tanstack/react-query'

import { getOneGame } from '../service/games.service'

export function useOneGames(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['game', id],
    queryFn: async () => {
      const response = await getOneGame(id)
      return response
    }
  })
  return { data, isLoading }
}
