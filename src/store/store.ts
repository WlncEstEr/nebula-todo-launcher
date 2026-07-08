import { create } from 'zustand'
import type { IGame } from '../data/games.data'

export interface IItemgame {
	itemGame: IGame
	lastId: number
	setGame: (game: IGame) => void
	setLastId: (id: number) => void
}

export const ItemGame = create<IItemgame>()(set => ({
	itemGame: {
		id: '',
		title: '',
		image: '',
		description: '',
		platforms: [],
		releaseDate: '',
		genre: '',
		reiting: 0,
		creator: '',
		price: 0,
		oldPrice: 0,
		publisher: ''
	},
	lastId: 0,
	setGame: (game: IGame) => set(state => ({ ...state, itemGame: game })),
	setLastId: (id: number) => set(state => ({ ...state, lastId: id }))
}))
