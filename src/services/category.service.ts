import { Category, ListData } from "@/types"
import api from "@/utils/api"
import { LIST_LIMIT } from "@/utils/constant"
import { useSuspenseQuery } from "@tanstack/react-query"

const getAllCategories = async ({
	page = 1,
	limit = LIST_LIMIT,
}: {
	page?: number
	limit?: number
}) => {
	const { data } = await api.get<ListData<Category & { bookCount: number }>>(
		"/v1/category",
		{
			params: {
				page,
				limit,
			},
		}
	)
	return data
}

export const useCategories = (page: number = 1, limit: number = LIST_LIMIT) => {
	return useSuspenseQuery({
		queryKey: ["categories", page, limit],
		queryFn: () => getAllCategories({ page, limit }),
	})
}
