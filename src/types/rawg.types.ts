export interface RawgAPI {
  count: number
  next: string
  previous: null
  results: Result[]
  user_platforms: boolean
}

export interface Result {
  slug: string
  name: string
  playtime: number
  platforms: Platform[]
  stores: Store[]
  released: string | null
  tba: boolean
  background_image: string
  rating: number
  rating_top: number
  ratings: Rating[]
  ratings_count: number
  reviews_text_count: number
  added: number
  added_by_status: AddedByStatus
  metacritic: number
  suggestions_count: number
  updated: string
  id: number
  score: null
  clip: null
  tags: Tag[]
  esrb_rating: EsrbRating | null
  user_game: null
  reviews_count: number
  saturated_color: Color
  dominant_color: Color
  short_screenshots: ShortScreenshot[]
  parent_platforms: Platform[]
  genres: Genre[]
}

export interface AddedByStatus {
  yet: number
  owned: number
  beaten: number
  toplay: number
  dropped: number
  playing: number
}

export type Color = '0f0f0f'

export interface EsrbRating {
  id: number
  name: string
  slug: string
  name_en: string
  name_ru: string
}

export interface Genre {
  id: number
  name: string
  slug: string
}

export interface Platform {
  platform: Genre
}

export interface Rating {
  id: number
  title: Title
  count: number
  percent: number
}

export type Title = 'recommended' | 'exceptional' | 'meh' | 'skip'

export interface ShortScreenshot {
  id: number
  image: string
}

export interface Store {
  store: Genre
}

export interface Tag {
  id: number
  name: string
  slug: string
  language: Language
  games_count: number
  image_background: string
}

export type Language = 'eng' | 'rus'
