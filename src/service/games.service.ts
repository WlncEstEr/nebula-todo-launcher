import { axiosClassic } from '../api/interceptors'
import { transformRawToGame } from '../api/rawg.api'
import type { IGame } from '../data/games.data'
import type { RawgAPI } from '../types/rawg.types'

const key = import.meta.env.VITE_RAW_KEY as string

export async function getGames(page = 1): Promise<IGame[]> {
  try {
    // const { data } = await axiosClassic.get<RawgAPI>(
    //   `/games?key=${key}&page=${page}&page_size=20&ordering=-rating`
    // )

    // return data.results.map((raw) => transformRawToGame(raw))
    const { data } = await axiosClassic.get<RawgAPI>(
      `/games?key=${key}&page=${page}&page_size=30&ordering=-rating`
    )

    return data.results.map((raw) => transformRawToGame(raw))
  } catch (error) {
    console.error('Failed to fetch games:', error)
    return [] // возвращаем пустой массив в случае ошибки
  }
}
