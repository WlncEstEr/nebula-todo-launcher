import { ArrowLeftCircle } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { gamesData } from '../../../../data/games.data'
import { DetailsItemSlug } from './DetailsItemSlug'

const Details = () => {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()

  const itemGame = gamesData.find((game) => game.id === slug)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        SafeGoBack()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  function SafeGoBack() {
    if (navigate.length > 1) {
      void navigate(-1)
    } else {
      void navigate('/', { replace: true })
    }
  }

  return (
    <div className="font-montserrat py-2 px-3">
      <div className="flex items-center gap-2 mt-2">
        <ArrowLeftCircle
          size={22}
          className="cursor-pointer"
          onClick={SafeGoBack}
        />
        <h1 className="text-base font-bold">About this Game</h1>
      </div>
      {/* <h2 className="text-lg font-semibold">Details</h2> */}
      <div className="grid grid-cols-[2fr_4fr] gap-4 mt-3">
        <div className="w-75 h-100 rounded-lg overflow-hidden shrink-0">
          <img
            src={itemGame?.vertImage}
            alt={itemGame?.id}
            width={300}
            height={450}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-lg text-text">{itemGame?.title || 'N/A'}</h2>
          <div className="flex gap-5 w-full justify-around mt-3">
            <div className="w-full flex flex-col gap-3 ">
              <DetailsItemSlug
                namespace="Developer"
                title={itemGame?.creator || 'N/A'}
                isPrimary
              />
              <DetailsItemSlug
                namespace="Publisher"
                title={itemGame?.publisher || 'N/A'}
                isPrimary
              />
              <DetailsItemSlug
                namespace="Release Date"
                title={itemGame?.releaseDate || 'N/A'}
              />
              <DetailsItemSlug
                namespace="Platform"
                title={itemGame?.platforms?.join(', ') || 'N/A'}
              />
              <DetailsItemSlug
                namespace="Genre"
                title={itemGame?.genre || 'N/A'}
                isPrimary
              />
              <DetailsItemSlug
                namespace="Rating"
                title={itemGame?.rating ? `${itemGame.rating}%` : 'N/A'}
                isPrimary
              />
              <DetailsItemSlug
                namespace="Description"
                title={itemGame?.description || 'N/A'}
                isBlock
              />
            </div>
          </div>
        </div>
        {/*TODO: МОЖНО ДОБАВИТЬ В ДАЛЬНЕЙШЕМ ОТЗЫВЫ ПО ИГРЕ ИЛИ ОЦЕНКИ КРИТИКОВ С ОТЗЫВАМИ \СИСЕТМНЫЕ ТРЕБОВАНИЯ*/}
      </div>
    </div>
  )
}

export default Details
