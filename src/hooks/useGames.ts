import { useQuery } from '@tanstack/react-query'
import { getGames } from '../service/games.service'

export function useGames() {
  const { data } = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const response = await getGames()
      return response
    }
  })
  return { data }
}
