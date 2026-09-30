import type { Genre } from './rawg.types'

export interface IGames extends IGame {
  vertImage: string
  smallImage: string
  description: string
  releaseDate: string
  creator: string[]
  publisher: string
  price?: number | null
  oldPrice?: number
  gameSize?: number
  finallySize?: number
  dlc?: string[]
  achievements?: string[]
  screenshots?: string[]
  videos?: string[]
  hoursInGame: number
}

export interface IGame {
  id: string
  title: string
  image: string
  platforms: string[]
  genres: Genre[]
  rating: number | null
  slug: string
}

export interface DetailsGamesRawgAPI {
  id: number
  slug: string
  name: string
  name_original: string
  description: string
  metacritic: null
  metacritic_platforms: unknown[]
  released: Date
  tba: boolean
  updated: string
  background_image: string
  background_image_additional: string
  website: string
  rating: number
  rating_top: number
  ratings: Rating[]
  reactions: null
  added: number
  added_by_status: AddedByStatus
  playtime: number
  screenshots_count: number
  movies_count: number
  creators_count: number
  achievements_count: number
  parent_achievements_count: number
  reddit_url: string
  reddit_name: string
  reddit_description: string
  reddit_logo: string
  reddit_count: number
  twitch_count: number
  youtube_count: number
  reviews_text_count: number
  ratings_count: number
  suggestions_count: number
  alternative_names: unknown[]
  metacritic_url: string
  parents_count: number
  additions_count: number
  game_series_count: number
  user_game: null
  reviews_count: number
  saturated_color: string
  dominant_color: string
  parent_platforms: ParentPlatform[]
  platforms: PlatformElement[]
  stores: Store[]
  developers: Developer[]
  genres: Developer[]
  tags: Developer[]
  publishers: Developer[]
  esrb_rating: null
  clip: null
  description_raw: string
}

export interface AddedByStatus {
  yet: number
  owned: number
  beaten: number
  toplay: number
  dropped: number
  playing: number
}

export interface Developer {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
  domain?: string
  language?: string
}

export interface ParentPlatform {
  platform: ParentPlatformPlatform
}

export interface ParentPlatformPlatform {
  id: number
  name: string
  slug: string
}

export interface PlatformElement {
  platform: PlatformPlatform
  released_at: Date
  requirements: Requirements
}

export interface PlatformPlatform {
  id: number
  name: string
  slug: string
  image: null
  year_end: null
  year_start: null
  games_count: number
  image_background: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Requirements {}

export interface Rating {
  id: number
  title: string
  count: number
  percent: number
}

export interface Store {
  id: number
  url: string
  store: Developer
}
