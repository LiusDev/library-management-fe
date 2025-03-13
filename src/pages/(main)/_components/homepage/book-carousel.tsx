import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { useBooks } from "@/services/book.service"

export function BookCarousel() {
	const [activeIndex, setActiveIndex] = useState(0)
	const { data } = useBooks(undefined, undefined, undefined, undefined, 1, 5)

	const books = useMemo(() => {
		return data.data
	}, [data.data])

	// Auto-rotate books
	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((current) => (current + 1) % books.length)
		}, 3000)
		return () => clearInterval(interval)
	}, [books.length])

	return (
		<div className="relative h-[400px] md:h-[500px] aspect-10/16 max-w-[500px] mx-auto">
			{books.map((book, index) => {
				// Calculate position based on index relative to active
				const position =
					(index - activeIndex + books.length) % books.length

				// Determine z-index, scale, and position based on carousel position
				let zIndex = books.length - position
				let scale = 1 - position * 0.1
				let translateX = position * 20
				let translateY = position * 10
				let rotate = position * -5
				let opacity = 1 - position * 0.2

				// Ensure minimum values
				scale = Math.max(0.6, scale)
				opacity = Math.max(0.3, opacity)

				// Apply different transform for books that would be "behind" the active one
				if (position > 2) {
					translateX = -20
					translateY = 5
					rotate = 5
					zIndex = 0
					opacity = 0
				}

				return (
					<div
						key={book._id}
						className={cn(
							"absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out cursor-pointer",
							position === 0
								? "pointer-events-auto"
								: "pointer-events-none"
						)}
						style={{
							zIndex,
							transform: `translateX(${translateX}%) translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
							opacity,
						}}
						onClick={() => setActiveIndex(index)}
					>
						<div
							className={cn(
								"rounded-lg shadow-xl overflow-hidden h-full bg-white"
							)}
						>
							<div className="relative h-full w-full overflow-hidden">
								<img
									src={book.cover || "/placeholder.svg"}
									alt={book.title}
									className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
								/>
							</div>
						</div>
					</div>
				)
			})}

			{/* Navigation dots */}
			<div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
				{books.map((_, index) => (
					<button
						key={index}
						className={cn(
							"w-2 h-2 rounded-full transition-all duration-300",
							activeIndex === index
								? "bg-blue-600 w-4"
								: "bg-gray-300"
						)}
						onClick={() => setActiveIndex(index)}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	)
}
