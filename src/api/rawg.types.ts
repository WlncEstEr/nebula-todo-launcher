export interface RawgGamesResponse {
  count: number
  next: string | null
  previous: string | null
  results: RawgGame[]
  user_platforms: boolean
}

export interface RawgRef {
  id: number
  name: string
  slug: string
}

export interface RawgGame {
  id: number
  slug: string
  name: string
  playtime: number
  platforms: { platform: RawgRef }[]
  stores: { store: RawgRef }[]
  released: string | null
  tba: boolean
  background_image: string | null
  rating: number
  rating_top: number
  ratings: { id: number; title: string; count: number; percent: number }[]
  ratings_count: number
  reviews_text_count: number
  added: number
  added_by_status: {
    yet: number
    owned: number
    beaten: number
    toplay: number
    dropped: number
    playing: number
  }
  metacritic: number | null
  suggestions_count: number
  updated: string
  score: null
  clip: null
  tags: {
    id: number
    name: string
    slug: string
    language: string
    games_count: number
    image_background: string
  }[]
  esrb_rating: { id: number; name: string; slug: string; name_en?: string; name_ru?: string } | null
  user_game: null
  reviews_count: number
  saturated_color: string
  dominant_color: string
  short_screenshots: { id: number; image: string }[]
  parent_platforms: { platform: RawgRef }[]
  genres: RawgRef[]
  description_raw?: string
}
