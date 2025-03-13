import BookCard from "@/components/book-card"
import { Pagination } from "@/components/ui/pagination"
import {
	useSearchParamCategories,
	useSearchParamKeyword,
	useSearchParamPagination,
	useSearchParamsSortOrder,
} from "@/hooks"
import { useBooks } from "@/services/book.service"
import { LIST_LIMIT } from "@/utils/constant"

export const BooksList = () => {
	const [keyword] = useSearchParamKeyword()
	const [categories] = useSearchParamCategories()
	const [sort, order] = useSearchParamsSortOrder("createdAt", "desc")
	const [page, setPage] = useSearchParamPagination(1)
	const { data } = useBooks(keyword, categories, sort, order, page)
	return (
		<>
			<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{data?.data.map((book) => (
					<BookCard key={book._id} book={book} />
				))}
			</div>
			<div className="mt-8 flex items-center justify-center">
				<Pagination
					value={page}
					onChange={setPage}
					total={Math.ceil(data?.total / LIST_LIMIT) || 1}
				/>
			</div>
		</>
	)
}
