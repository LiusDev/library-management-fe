import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { useMemo } from "react"

interface PaginationProps {
	value: number
	onChange: (page: number) => void
	total: number
	siblingsCount?: number
}

export function Pagination({
	value,
	onChange,
	total,
	siblingsCount = 1,
}: PaginationProps) {
	const currentPage = value

	const paginationRange = useMemo(() => {
		// Calculate the range of page numbers to display
		const totalPageNumbers = siblingsCount * 2 + 3 // siblings + current + first + last

		// Case 1: If the number of pages is less than the page numbers we want to show
		if (totalPageNumbers >= total) {
			return Array.from({ length: total }, (_, i) => i + 1)
		}

		const leftSiblingIndex = Math.max(currentPage - siblingsCount, 1)
		const rightSiblingIndex = Math.min(currentPage + siblingsCount, total)

		const shouldShowLeftDots = leftSiblingIndex > 2
		const shouldShowRightDots = rightSiblingIndex < total - 1

		// Case 2: No left dots to show, but right dots to be shown
		if (!shouldShowLeftDots && shouldShowRightDots) {
			const leftItemCount = 1 + 2 * siblingsCount
			const leftRange = Array.from(
				{ length: leftItemCount },
				(_, i) => i + 1
			)

			return [...leftRange, "dots", total]
		}

		// Case 3: No right dots to show, but left dots to be shown
		if (shouldShowLeftDots && !shouldShowRightDots) {
			const rightItemCount = 1 + 2 * siblingsCount
			const rightRange = Array.from(
				{ length: rightItemCount },
				(_, i) => total - rightItemCount + i + 1
			)

			return [1, "dots", ...rightRange]
		}

		// Case 4: Both left and right dots to be shown
		if (shouldShowLeftDots && shouldShowRightDots) {
			const middleRange = Array.from(
				{ length: rightSiblingIndex - leftSiblingIndex + 1 },
				(_, i) => leftSiblingIndex + i
			)

			return [1, "dots", ...middleRange, "dots", total]
		}

		return []
	}, [currentPage, total, siblingsCount])

	const onNext = () => {
		if (currentPage < total) {
			onChange(currentPage + 1)
		}
	}

	const onPrevious = () => {
		if (currentPage > 1) {
			onChange(currentPage - 1)
		}
	}

	return (
		<div className="flex items-center justify-center space-x-2">
			<Button
				variant="outline"
				size="icon"
				onClick={onPrevious}
				disabled={currentPage === 1}
				aria-label="Go to previous page"
			>
				<ChevronLeft className="h-4 w-4" />
			</Button>

			{paginationRange.map((pageNumber, index) => {
				if (pageNumber === "dots") {
					return (
						<Button
							key={`dots-${index}`}
							variant="outline"
							size="icon"
							disabled
							className="cursor-default"
						>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					)
				}

				return (
					<Button
						key={pageNumber}
						variant={
							pageNumber === currentPage ? "default" : "outline"
						}
						size="icon"
						onClick={() => onChange(pageNumber as number)}
						aria-label={`Go to page ${pageNumber}`}
						aria-current={
							pageNumber === currentPage ? "page" : undefined
						}
					>
						{pageNumber}
					</Button>
				)
			})}

			<Button
				variant="outline"
				size="icon"
				onClick={onNext}
				disabled={currentPage === total}
				aria-label="Go to next page"
			>
				<ChevronRight className="h-4 w-4" />
			</Button>
		</div>
	)
}
