import { BorrowTransaction, ListData } from "@/types"
import api from "@/utils/api"
import { useSuspenseQuery } from "@tanstack/react-query"

const getTransactions = async (
	page: number | null = 1,
	limit: number | null = 10
) => {
	const { data } = await api.get<ListData<BorrowTransaction>>("/v1/borrow", {
		params: {
			page,
			limit,
		},
	})
	return data
}

export const useTransactions = (page: number | null, limit: number | null) => {
	return useSuspenseQuery({
		queryKey: ["borrowTransactions", page, limit],
		queryFn: () => getTransactions(page, limit),
	})
}
