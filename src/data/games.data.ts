export interface IQuickPlay {
  id: string
  title: string
  image: string
}

export const quickPlayData: IQuickPlay[] = [
  {
    id: 'hogwarts-legacy',
    title: 'Hogwarts Legacy',
    image: '/images/small/small-hl.jpg'
  },
  {
    id: 'saint-row-3',
    title: 'Saint Row 3',
    image: '/images/small/small-sr.jpg'
  },
  {
    id: 'little-nightmares',
    title: 'Little Nightmares',
    image: '/images/small/small-ln.png'
  }
]

export interface IGame {
  id: string
  title: string
  image: string
  vertImage: string
  description: string
  platforms: string[]
  releaseDate: string
  genre: string
  rating: number | null
  creator: string
  publisher: string
  price?: number | null
  oldPrice?: number
  gameSize?: number
  finallySize?: number
  dlc?: string[]
  achievements?: string[]
  screenshots?: string[]
  videos?: string[]
}

// конвертируй ниже gameSize и finallySize в числа, чтобы можно было сравнивать размеры игр и сортировать их по размеру. Например, "25 GB" -> 25, "1.5 GB" -> 1.5, "500 MB" -> 0.5 + Если размер в MB, то делить на 1024, чтобы получить размер в GB.

export const gamesData: IGame[] = [
  {
    id: 'hogwarts-legacy',
    title: 'Hogwarts Legacy',
    image: '/images/covers/hogwarts-legacy.jpg',
    vertImage: '/images/vertical/vert-hogwarts-legacy.jpg',
    creator: 'Portkey Games',
    description:
      'Hogwarts Legacy is an immersive, open-world action RPG set in the world first introduced in the Harry Potter books. Experience life as a student at the Hogwarts School of Witchcraft and Wizardry like never before, as you live the unwritten and embark on a dangerous journey to uncover hidden truths of the wizarding world.',
    platforms: ['PC', 'PS4', 'PS5', 'Xbox One', 'Xbox Series X/S'],
    releaseDate: '2023-02-10',
    genre: 'Action RPG',
    rating: 75,
    price: 29.99,
    oldPrice: 59.99,
    gameSize: 25,
    finallySize: 29,
    publisher: 'Warner Bros. Interactive Entertainment'
  },
  {
    id: 'little-nightmares',
    title: 'Little Nightmares',
    image: '/images/covers/little-nightmares.jpg',
    vertImage: '/images/vertical/vert-little-nightmares.jpg',
    creator: 'Tarsier Studios',
    description:
      'Little Nightmares is a psychological horror platformer game developed by Tarsan Games. Players control a young girl named Six as she navigates through a series of surreal and disturbing environments.',
    platforms: ['PC', 'PS4', 'Xbox One'],
    releaseDate: '2017-09-12',
    genre: 'Horror Platformer',
    rating: 94,
    price: 4.99,
    oldPrice: 12.99,
    gameSize: 10,
    finallySize: 12,
    publisher: 'BANDAI NAMCO Entertainment'
  },
  {
    id: 'little-nightmares-2',
    title: 'Little Nightmares 2',
    image: '/images/covers/little-nightmares-2.jpg',
    vertImage: '/images/vertical/vert-little-nightmares-2.jpg',
    creator: 'Tarsier Studios',
    description:
      'Little Nightmares 2 is a psychological horror platformer game developed by Tarsan Games. Players control a young girl named Six as she navigates through a series of surreal and disturbing environments.',
    platforms: ['PC', 'PS4', 'Xbox One'],
    releaseDate: '2020-09-12',
    genre: 'Horror Platformer',
    rating: 0,
    price: 9.99,
    oldPrice: 0,
    gameSize: 15,
    finallySize: 18,
    publisher: 'BANDAI NAMCO Entertainment'
  },
  {
    id: 'the-finals',
    title: 'The Finals',
    image: '/images/covers/the-finals.jpg',
    vertImage: '/images/vertical/vert-the-finals.jpg',
    creator: 'Embark Studios',
    description:
      'The Finals is a competitive first-person shooter game developed by Embark Studios. Players compete in fast-paced, team-based matches across various dynamic and destructible environments.',
    platforms: ['PC', 'Xbox Series X/S'],
    releaseDate: '2024-03-15',
    genre: 'First-Person Shooter',
    rating: 74,
    price: 0,
    gameSize: 20,
    finallySize: 24,
    publisher: 'Embark Studios'
  },

  {
    id: 'saint-row-3',
    title: 'Saint Row 3',
    image: '/images/covers/saints-row-3.jpg',
    vertImage: '/images/vertical/vert-saints-row-3.jpg',
    creator: 'Volition',
    description:
      'Saint Row 3 is an action-adventure game developed by Volition. Players take on the role of a young man named Marcellus Washington as he navigates through the streets of Saint Row.',
    platforms: ['PC', 'PS4', 'Xbox One'],
    releaseDate: '2017-09-12',
    genre: 'Action Adventure',
    rating: 78,
    price: 19.99,
    oldPrice: 39.99,
    gameSize: 25,
    finallySize: 29,
    publisher: 'THQ Nordic'
  }
]
