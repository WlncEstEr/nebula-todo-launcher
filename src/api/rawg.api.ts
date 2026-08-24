import type { IGame } from '../data/games.data'
import type { Result } from '../types/rawg.types'

export function transformRawToGame(raw: Result): IGame {
  return {
    id: String(raw.id),
    title: raw.name,
    image: raw.background_image ?? '',
    vertImage: raw.background_image ?? '',
    smallImage: raw.background_image ?? '',
    description: '',
    platforms: raw.platforms?.map((p) => p.platform.name) ?? [],
    releaseDate: raw.released ?? '', // было raw.released.toString()
    genre: raw.genres?.[0]?.name ?? 'Unknown',
    rating: raw.rating || null,
    creator: '',
    publisher: '',
    hoursInGame: 0,
    isBuy: false,
    isFavorite: false,
    isInstaller: false
  }
}
