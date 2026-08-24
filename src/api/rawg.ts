import type { IGame } from '../data/games.data'
import { useGames } from '../store/games.store'
import type { RawgGame, RawgGamesResponse } from './rawg.types'

const API_KEY = import.meta.env.VITE_RAWG_KEY as string | undefined
const BASE = 'https://api.rawg.io/api'

export function toGame(raw: RawgGame): IGame {
  return {
    id: raw.slug,
    title: raw.name,
    image: raw.background_image ?? '',
    vertImage: raw.background_image ?? '',
    smallImage: raw.background_image ?? '',
    description: raw.description_raw ?? '',
    platforms: raw.platforms?.map((p) => p.platform.name) ?? [],
    releaseDate: raw.released ?? '',
    genre: raw.genres?.[0]?.name ?? '',
    rating: raw.metacritic ?? null,
    creator: '',
    publisher: '',
    price: 0,
    oldPrice: 0,
    gameSize: 0,
    finallySize: 0,
    screenshots: raw.short_screenshots?.map((s) => s.image),
    hoursInGame: raw.playtime ?? 0,
    isBuy: false,
    isFavorite: false,
    isInstaller: false
  }
}

export async function fetchRawgGames(page = 1, pageSize = 20): Promise<IGame[]> {
  if (!API_KEY) {
    console.warn('[rawg] VITE_RAWG_KEY не задан — загрузка отменена')
    return []
  }
  const res = await fetch(`${BASE}/games?key=${API_KEY}&page=${page}&page_size=${pageSize}`)
  if (!res.ok) throw new Error(`[rawg] HTTP ${res.status}`)
  const data: RawgGamesResponse = await res.json()
  return data.results.map(toGame)
}

export async function loadRawgIntoStore(page = 1, pageSize = 20): Promise<number> {
  const games = await fetchRawgGames(page, pageSize)
  if (games.length) useGames.getState().overwriteAll(games)
  return games.length
}
