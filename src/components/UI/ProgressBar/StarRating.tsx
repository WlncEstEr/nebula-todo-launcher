import { Star, StarIcon } from 'lucide-react'
import { useState } from 'react'

const MAX_STARS = 5
const STEP = 0.01 // шаг выбора: 0.5 — половина звезды, 1 — целая

interface IStarRatingProps {
  /** Текущая оценка. null / undefined — оценки ещё нет */
  value?: number | null
  /** Без него компонент работает только на чтение */
  onChange?: (value: number) => void
  size?: number
  className?: string
}

export function StarRating({
  value = null,
  onChange,
  size = 40,
  className = ''
}: IStarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null)

  const interactive = Boolean(onChange)
  const shown = hoverValue ?? value ?? 0

  const select = (next: number) => {
    if (!interactive) return
    // повторный клик по текущему значению сбрасывает оценку в 0
    onChange?.(next === value ? 0 : next)
  }

  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      role={interactive ? 'slider' : 'img'}
      aria-label="Рейтинг"
      aria-valuemin={0}
      aria-valuemax={MAX_STARS}
      aria-valuenow={value ?? 0}
      tabIndex={interactive ? 0 : undefined}
      onMouseLeave={() => setHoverValue(null)}
      onKeyDown={(e) => {
        if (!interactive) return
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          select(Math.min((value ?? 0) + STEP, MAX_STARS))
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          select(Math.max((value ?? 0) - STEP, 0))
        }
      }}
    >
      {Array.from({ length: MAX_STARS }, (_, i) => (
        <StarSlot
          key={i}
          index={i}
          fill={Math.min(Math.max(shown - i, 0), 1)}
          size={size}
          interactive={interactive}
          onHover={(fraction) => setHoverValue(i + fraction)}
          onSelect={(fraction) => select(i + fraction)}
        />
      ))}
    </div>
  )
}

interface IStarSlotProps {
  index: number
  /** Заполнение звезды: 0 — пусто, 1 — полностью */
  fill: number
  size: number
  interactive: boolean
  onHover: (fraction: number) => void
  onSelect: (fraction: number) => void
}

function StarSlot({
  index,
  fill,
  size,
  interactive,
  onHover,
  onSelect
}: IStarSlotProps) {
  return (
    <div
      className="relative shrink-0 transition-transform duration-150 ease-out hover:scale-110"
      style={{ width: size, height: size }}
    >
      {/* пустой контур */}
      <StarIcon
        size={size}
        className="absolute inset-0 text-gray-600 transition-colors duration-200"
      />

      {/* заливка, обрезается по проценту */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 overflow-hidden transition-[width] duration-200 ease-out"
        style={{ width: `${fill * 100}%` }}
      >
        <Star fill="currentColor" size={size} className="text-yellow-500" />
      </div>

      {interactive && (
        <>
          <button
            type="button"
            aria-label={`Оценка ${index + 0.5}`}
            className="absolute inset-y-0 left-0 w-1/2 cursor-pointer"
            onMouseEnter={() => onHover(0.5)}
            onClick={() => onSelect(0.5)}
          />
          <button
            type="button"
            aria-label={`Оценка ${index + 1}`}
            className="absolute inset-y-0 right-0 w-1/2 cursor-pointer"
            onMouseEnter={() => onHover(1)}
            onClick={() => onSelect(1)}
          />
        </>
      )}
    </div>
  )
}
