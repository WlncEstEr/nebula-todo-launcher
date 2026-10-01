import { ArrowLeftCircle, PlusCircle } from 'lucide-react'
import { useEffect } from 'react'
import { useParams } from 'react-router'

import { useStoreLibrary } from '@/store/library.store'

import { useIsPurchased } from '@/hooks/useIsPurchased'
import { useSafeGoBack } from '@/hooks/useSaveGoBack'

import { useOneGames } from '../../../../hooks/useOneGames'
import { Button } from '../../Button/Button'
import { FieldDiscount } from '../../FieldDiscount/FieldDiscount'
import { LoaderCircl } from '../../Loader'
import { StarRating } from '../../ProgressBar/StarRating'

import { DetailsItemSlug } from './DetailsItemSlug'

const Details = () => {
  const { slug } = useParams<{ slug: string }>()
  const goBack = useSafeGoBack()

  const { data: itemGame, isLoading } = useOneGames(slug ?? '')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        goBack()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const isPurchased = useIsPurchased(itemGame?.id)
  const purchase = useStoreLibrary((s) => s.purchase)
  const remove = useStoreLibrary((s) => s.remove)

  if (isLoading) return <LoaderCircl />
  if (!itemGame) return <div>Игра не найдена</div>

  return (
    <div className="font-montserrat py-2 px-3 h-8/10">
      <div className="flex items-center gap-2 mt-2">
        <ArrowLeftCircle
          size={22}
          className="cursor-pointer"
          onClick={goBack}
        />
        <h1 className="text-base font-bold">About this Game</h1>
      </div>
      {/* <h2 className="text-lg font-semibold">Details</h2> */}
      <div className="grid grid-cols-[2fr_4fr] gap-4 mt-3">
        <div className="w-75 h-100 flex flex-col items-center gap-2">
          <div className="w-75 h-100 rounded-lg overflow-hidden shrink-0">
            {isLoading && <LoaderCircl />}
            <img
              src={itemGame?.vertImage}
              alt={itemGame?.id}
              width={300}
              height={450}
              className="w-full h-full object-cover"
            />
          </div>
          <StarRating value={itemGame?.rating ?? 0} />
          <div className="flex gap-3 mt-5">
            <FieldDiscount
              price={isPurchased ? -1 : (itemGame.oldPrice ?? 0)}
              click={() =>
                isPurchased ? remove(itemGame?.id) : purchase(itemGame?.id)
              }
            />
            {/* <Button title={String(itemGame?.price ?? 0) + '$'} isPrimary /> */}
            <Button title="Wishlist" icon={<PlusCircle />} />
          </div>
        </div>

        <div>
          <h2 className="text-lg text-text">{itemGame?.title ?? 'N/A'}</h2>
          <div className="flex gap-5 w-full justify-around mt-3">
            <div className="w-full flex flex-col gap-3 ">
              <DetailsItemSlug
                namespace="Developer"
                title={itemGame?.creator ?? 'N/A'}
                isPrimary
              />
              <DetailsItemSlug
                namespace="Publisher"
                title={itemGame?.publisher ?? 'N/A'}
                isPrimary
              />
              <DetailsItemSlug
                namespace="Release Date"
                title={itemGame?.releaseDate ?? 'N/A'}
              />
              <DetailsItemSlug
                namespace="Platform"
                title={itemGame?.platforms?.join(', ') ?? 'N/A'}
              />
              <DetailsItemSlug
                namespace="Genre"
                title={itemGame?.genres ?? 'N/A'}
                isPrimary
              />
              <DetailsItemSlug
                namespace="Rating"
                title={itemGame?.rating ? `${itemGame.rating}% / 5.00` : 'N/A'}
                isPrimary
              />
              <div className="max-h-78 overflow-y-auto">
                <DetailsItemSlug
                  namespace="Description"
                  title={itemGame?.description ?? 'N/A'}
                  isBlock
                />
              </div>
            </div>
          </div>
        </div>
        {/*TODO: МОЖНО ДОБАВИТЬ В ДАЛЬНЕЙШЕМ ОТЗЫВЫ ПО ИГРЕ ИЛИ ОЦЕНКИ КРИТИКОВ С ОТЗЫВАМИ \СИСЕТМНЫЕ ТРЕБОВАНИЯ*/}
      </div>
    </div>
  )
}

export default Details
