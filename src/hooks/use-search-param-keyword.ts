import { useCallback, useMemo } from "react"
import { useSearchParams } from "react-router"

export const useSearchParamKeyword = (initialKeyword?: string) => {
	const [searchParams, setSearchParams] = useSearchParams()

	const validKeyword = useMemo(() => {
		const keyword = searchParams.get("keyword") || initialKeyword || ""
		return keyword
	}, [searchParams, initialKeyword])

	const handleChangeKeyword = useCallback(
		(keyword: string | undefined) => {
			const params = new URLSearchParams(searchParams)
			if (keyword) {
				params.set("keyword", keyword)
			} else {
				params.delete("keyword")
			}
			setSearchParams(params)
		},
		[searchParams, setSearchParams]
	)
	return [validKeyword, handleChangeKeyword] as const
}
