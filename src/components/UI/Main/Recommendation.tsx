import {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState
} from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router/internal/react-server-client'
import type { Swiper as SwiperInstance } from 'swiper'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { buildPath } from '../../../config/routing.config'
import { useGames } from '../../../hooks/useGames'
import { useFocus } from '../../../store/focus.store'
import { ItemGame } from '../../../store/store'
import { ItemCard } from '../Card/ItemCard'

const AUTOPLAY_DELAY = 10000

export function Recommendation() {
  const { lastId, setLastId, setSelectedGameId } = ItemGame()

  const swiperRef = useRef<SwiperInstance | null>(null)

  const { data } = useGames()

  const [activeIndex, setActiveIndex] = useState(lastId)
  const deferredActiveIndex = useDeferredValue(activeIndex)

  const [progress, setProgress] = useState(0)
  const animationFrameRef = useRef<number | null>(null)
  // eslint-disable-next-line react-hooks/purity
  const startTimeRef = useRef<number>(Date.now())
  const animateRef = useRef<() => void>(() => {
    ''
  })

  const animate = () => {
    // eslint-disable-next-line react-hooks/purity
    const elapsed = Date.now() - startTimeRef.current
    const newProgress = Math.min((elapsed / AUTOPLAY_DELAY) * 100, 100)

    setProgress(newProgress)

    if (newProgress < 100) {
      animationFrameRef.current = requestAnimationFrame(animate)
    }
  }

  useEffect(() => {
    animateRef.current = animate
  })
  const resetProgressBar = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    setProgress(0)
    startTimeRef.current = Date.now()
    animationFrameRef.current = requestAnimationFrame(() =>
      animateRef.current()
    )
  }, [])

  useEffect(() => {
    const game = data?.[lastId]
    if (game) setSelectedGameId(game.id)
  }, [data, lastId, setSelectedGameId])

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
    useFocus.getState().setZone('main')
  }, [])

  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const swiper = swiperRef.current
      if (!swiper) return
      if (useFocus.getState().zone !== 'main') return

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          swiper.slidePrev()
          resetProgressBar()
          break

        case 'ArrowRight':
          e.preventDefault()
          swiper.slideNext()
          resetProgressBar()
          break

        case 'Enter': {
          e.preventDefault()
          const game = data?.[swiper.realIndex]
          if (!game) return
          void navigate(buildPath('DETAILS', { slug: game.slug ?? '' }))
          break
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [data, navigate, resetProgressBar])

  const syncActiveSlide = (swiper: SwiperInstance) => {
    const activeSlide = swiper.slides[swiper.activeIndex]
    // console.log(activeSlide)
    const slideIndex = activeSlide?.getAttribute('data-swiper-slide-index')
    if (slideIndex === null || slideIndex === undefined) return

    const realIndex = Number(slideIndex)
    setActiveIndex(realIndex)
    setLastId(realIndex)
    const game = data?.[realIndex]
    if (game) setSelectedGameId(game.id)
    resetProgressBar()
  }

  return (
    <div className="h-72 px-3 py-2 flex flex-row gap-3 mt-2">
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
        {data?.map((game, index) => (
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
