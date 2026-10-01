import type { DetailsGamesRawgAPI, IGame, IGames } from '../types/games.types'
import type { Result } from '../types/rawg.types'

export function transformRawToGame(raw: Result): IGame {
  return {
    id: String(raw.id),
    title: raw.name,
    image: raw.background_image ?? '',
    platforms: raw.platforms?.map((p) => p.platform.name) ?? [],
    rating: raw.rating || null,
    genres: raw.genres,
    slug: raw.slug
  }
}

export function transformGameToGame(raw: DetailsGamesRawgAPI): IGames {
  return {
    id: String(raw.id),
    title: raw.name,
    image: raw.background_image ?? '',
    platforms: raw.platforms?.map((p) => p.platform.name) ?? [],
    rating: raw.rating || null,
    creator: raw.developers.map((dev) => dev.name),
    slug: raw.slug,
    description: raw.description,
    publisher: raw.publishers.map((p) => p.name).join(', '),
    hoursInGame: raw.playtime,
    releaseDate: raw.released.toString(),
    vertImage: raw.background_image_additional,
    smallImage: raw.background_image,
    price: Math.floor(Math.random() * 100) + 0.99,
    oldPrice: Math.floor(Math.random() * 100) + 0.99,
    gameSize: Math.floor(Math.random() * 100) + 1,
    finallySize: Math.floor(Math.random() * 100) + 1 + (raw.playtime || 0),
    genres: raw.genres as IGames['genres'],
    dlc: raw.additions_count ? [`DLCs: ${raw.additions_count}`] : [],
    achievements: raw.achievements_count
      ? [`Achievements: ${raw.achievements_count}`]
      : [],
    screenshots: raw.screenshots_count
      ? [`Screenshots: ${raw.screenshots_count}`]
      : [],
    videos: raw.movies_count ? [`Videos: ${raw.movies_count}`] : []
    // isBuy: randomBoolean(0.3)
  }
}

// function randomBoolean(probability = 0.5): boolean {
//   return Math.random() < probability
// }
