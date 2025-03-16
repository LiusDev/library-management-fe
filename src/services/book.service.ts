import { Book, ListData } from "@/types"
import api from "@/utils/api"
import { LIST_LIMIT } from "@/utils/constant"
import { useSuspenseQuery } from "@tanstack/react-query"

const getAllBooks = async ({
	keyword,
	categories,
	sort = "createdAt",
	order = "desc",
	page = 1,
	limit = LIST_LIMIT,
}: {
	keyword?: string
	categories?: string[] | string
	order?: "asc" | "desc"
	sort?: string
	page?: number
	limit?: number
}) => {
	const { data } = await api.get<ListData<Book>>("/v1/books", {
		params: {
			keyword,
			categories,
			order,
			sort,
			page,
			limit,
		},
	})
	return data
}

export const useBooks = (
	keyword?: string,
	categories?: string[] | string,
	sort = "createdAt",
	order = "desc" as "asc" | "desc",
	page: number = 1,
	limit: number = LIST_LIMIT
) => {
	return useSuspenseQuery({
		queryKey: ["books", keyword, categories, order, sort, page, limit],
		queryFn: () =>
			getAllBooks({ keyword, categories, order, sort, page, limit }),
	})
}

const getBookById = async (id: string | undefined) => {
	if (!id) return
	const { data } = await api.get<Book>(`/v1/books/${id}`)
	return data
}

export const useBook = (id: string | undefined) => {
	return useSuspenseQuery({
		queryKey: ["book", id],
		queryFn: () => getBookById(id),
	})
}

export const borrowBook = async (
	bookId: string | undefined,
	period: string
) => {
	if (!bookId || !period) return
	const { data } = await api.post("/v1/books/borrow", {
		bookId,
		time: +period,
	})
	return data
}
