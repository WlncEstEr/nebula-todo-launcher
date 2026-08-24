import { useDeferredValue, useEffect, useRef, useState } from 'react'
import type { Swiper as SwiperInstance } from 'swiper'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ItemGame } from '../../../store/store'
import { ItemCard } from '../Card/ItemCard'

import { useNavigate } from 'react-router'
import { Link } from 'react-router/internal/react-server-client'
import 'swiper/css'
import { buildPath } from '../../../config/routing.config'
import { useFocus } from '../../../store/focus.store'
import { useStoreGames } from '../../../store/games.store'

const AUTOPLAY_DELAY = 10000

export function Recommendation() {
  const { lastId, setLastId, setSelectedGameId } = ItemGame()

  const swiperRef = useRef<SwiperInstance | null>(null)

  const [activeIndex, setActiveIndex] = useState(lastId)
  const deferredActiveIndex = useDeferredValue(activeIndex)

  const [progress, setProgress] = useState(0)
  const animationFrameRef = useRef<number | null>(null)
  // eslint-disable-next-line react-hooks/purity
  const startTimeRef = useRef<number>(Date.now())

  const gamesNoBuy = useStoreGames((s) => s.games).filter((game) => !game.isBuy)

  const animate = () => {
    // eslint-disable-next-line react-hooks/purity
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
    const game = gamesNoBuy[lastId]
    if (game) setSelectedGameId(game.id)
  }, [lastId, setSelectedGameId])

  useEffect(() => {
    startTimeRef.current = Date.now()
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!swiperRef.current) return
      if (useFocus.getState().zone !== 'main') return

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
          // активный индекс тоже читаем из стора, а не из замыкания
          void navigate(
            buildPath('DETAILS', {
              slug: gamesNoBuy[ItemGame.getState().lastId].id
            })
          )
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, []) // депсы больше не нужны — всё читается из getState()

  const syncActiveSlide = (swiper: SwiperInstance) => {
    const activeSlide = swiper.slides[swiper.activeIndex]
    // console.log(activeSlide)
    const slideIndex = activeSlide?.getAttribute('data-swiper-slide-index')
    if (slideIndex === null || slideIndex === undefined) return

    const realIndex = Number(slideIndex)
    setActiveIndex(realIndex)
    setLastId(realIndex)
    const game = gamesNoBuy[realIndex]
    if (game) setSelectedGameId(game.id)
    resetProgressBar()
  }

  return (
    <div className="h-full px-3 py-2 flex flex-row gap-3 mt-2">
      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => {
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
        {gamesNoBuy.map((game, index) => (
          <SwiperSlide key={game.id}>
            <Link to={buildPath('DETAILS', { slug: game.id })}>
              <ItemCard
                game={game}
                isActive={index === deferredActiveIndex}
                progress={index === deferredActiveIndex ? progress : 0}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
