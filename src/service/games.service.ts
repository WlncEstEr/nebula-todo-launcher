import { axiosClassic } from '../api/interceptors'
import { transformGameToGame, transformRawToGame } from '../api/rawg.api'
import type { IDeveloper } from '../types/developersRawg.types'
import type { DetailsGamesRawgAPI, IGame, IGames } from '../types/games.types'
import type { ResponseRawgAPI } from '../types/rawg.types'

const key = import.meta.env.VITE_RAW_KEY as string

export async function getGames(page = 1): Promise<IGame[]> {
  try {
    const { data } = await axiosClassic.get<ResponseRawgAPI>(
      `/games?key=${key}&page=${page}&page_size=30&ordering=-rating`
    )
    return data.results.map((raw) => transformRawToGame(raw))
  } catch (error) {
    console.error('Failed to fetch games:', error)
    return []
  }
}

export async function getOneGame(
  page = 1,
  id: string
): Promise<IGames | undefined> {
  try {
    const { data } = await axiosClassic.get<DetailsGamesRawgAPI>(
      `/games/${id}?key=${key}&page=${page}&page_size=30&ordering=-rating`
    )
    return transformGameToGame(data)
  } catch (error) {
    console.error('Failed to fetch games:', error)
    return undefined
  }
}

export async function getDeveloper(id: number): Promise<string> {
  const { data } = await axiosClassic.get<IDeveloper>(
    `/developers/${id}?key=${key}`
  )
  return data.name
}

// https://api.rawg.io/api/games/1017366?key=a022b5e79f58433981a04d315b63aabf&page=1&page_size=20&ordering=-rating
