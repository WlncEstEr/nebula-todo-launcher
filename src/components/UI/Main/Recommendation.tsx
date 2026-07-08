import { useDeferredValue, useEffect, useRef, useState } from 'react'
import type { Swiper as SwiperInstance } from 'swiper'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { gamesData } from '../../../data/games.data'
import { ItemGame } from '../../../store/store'
import { ItemCard } from '../Card/ItemCard'

import 'swiper/css'

interface DetailsProps {
	setIsDetails: React.Dispatch<React.SetStateAction<boolean>>
}

const AUTOPLAY_DELAY = 10000

export function Recommendation({ setIsDetails }: DetailsProps) {
	const swiperRef = useRef<SwiperInstance | null>(null)
	const { setGame, lastId, setLastId } = ItemGame()

	const [activeIndex, setActiveIndex] = useState(lastId)
	const deferredActiveIndex = useDeferredValue(activeIndex)

	const [progress, setProgress] = useState(0)
	const animationFrameRef = useRef<number | null>(null)
	const startTimeRef = useRef<number>(Date.now())

	const animate = () => {
		const elapsed = Date.now() - startTimeRef.current
		const newProgress = Math.min((elapsed / AUTOPLAY_DELAY) * 100, 100)

		setProgress(newProgress)

		if (newProgress < 100) {
			animationFrameRef.current = requestAnimationFrame(animate)
		}
	}

	const resetProgressBar = () => {
		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current)
		}
		setProgress(0)
		startTimeRef.current = Date.now()
		animationFrameRef.current = requestAnimationFrame(animate)
	}

	useEffect(() => {
		setGame(gamesData[lastId])
	}, [])

	useEffect(() => {
		startTimeRef.current = Date.now()
		animationFrameRef.current = requestAnimationFrame(animate)

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current)
			}
		}
	}, [])

	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (!swiperRef.current) return

			switch (e.key) {
				case 'ArrowLeft':
					e.preventDefault()
					swiperRef.current.slidePrev()
					resetProgressBar()
					break
				case 'ArrowRight':
					e.preventDefault()
					swiperRef.current.slideNext()
					resetProgressBar()
					break
				case 'Enter':
					e.preventDefault()
					setIsDetails(true)
					break
			}
		}

		window.addEventListener('keydown', handleKeyPress)
		return () => window.removeEventListener('keydown', handleKeyPress)
	}, [setIsDetails])

	const syncActiveSlide = (swiper: SwiperInstance) => {
		const activeSlide = swiper.slides[swiper.activeIndex]
		const slideIndex = activeSlide?.getAttribute('data-swiper-slide-index')
		if (slideIndex === null || slideIndex === undefined) return

		const realIndex = Number(slideIndex)
		setActiveIndex(realIndex)
		setGame(gamesData[realIndex])
		setLastId(realIndex)
		resetProgressBar()
	}

	return (
		<div className="h-full px-3 py-2 flex flex-row gap-3 mt-2">
			<Swiper
				modules={[Autoplay]}
				onSwiper={swiper => {
					swiperRef.current = swiper
					swiper.slideToLoop(lastId, 0, false)
				}}
				loop
				spaceBetween={80}
				slidesPerView={3.5}
				slideToClickedSlide
				autoplay={{
					delay: AUTOPLAY_DELAY,
					disableOnInteraction: false
				}}
				onSlideChange={syncActiveSlide}
			>
				{gamesData.map((game, index) => (
					<SwiperSlide key={game.id}>
						<ItemCard
							game={game}
							isActive={index === deferredActiveIndex}
							progress={index === deferredActiveIndex ? progress : 0}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
