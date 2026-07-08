// ProgressBar.tsx
interface ProgressBarProps {
	value: number
	className?: string
}

export function ProgressBar({ value, className = '' }: ProgressBarProps) {
	const clamped = Math.min(100, Math.max(0, value))

	return (
		<div
			className={`w-full flex items-center gap-2.5 pt-1 rounded ${className}`}
		>
			<div className="flex-1 h-0.75 bg-[#2a2a2a] rounded-full overflow-hidden items-center">
				<div
					className="h-full bg-[#f12c16] rounded-full transition-[width] duration-400 ease-in-out"
					style={{ width: `${clamped}%` }}
					role="progressbar"
					aria-valuenow={clamped}
					aria-valuemin={0}
					aria-valuemax={100}
				/>
			</div>
			<span className="text-[10px] text-text">{clamped}%</span>
		</div>
	)
}
