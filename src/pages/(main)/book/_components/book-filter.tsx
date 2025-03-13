import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import {
	useSearchParamCategories,
	useSearchParamKeyword,
	useSearchParamsSortOrder,
} from "@/hooks"
import { useCategories } from "@/services/category.service"
import { Category } from "@/types"
import { CheckedState } from "@radix-ui/react-checkbox"
import { Search, SortAsc, SortDesc, Trash2 } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useDebouncedValue } from "@mantine/hooks"
import { useSearchParams } from "react-router"

const BookFilter = () => {
	const { data } = useCategories(1, 100)
	const categories = useMemo(() => data?.data, [data])
	const [, setSearchParams] = useSearchParams()
	const [keyword, setKeyword] = useState("")
	const [debouncedKeyword] = useDebouncedValue(keyword, 350)
	const [, setSearchKeyword] = useSearchParamKeyword()
	useEffect(() => {
		if (debouncedKeyword.trim() === "") {
			setSearchKeyword(undefined)
		} else {
			setSearchKeyword(debouncedKeyword)
		}
	}, [debouncedKeyword, setSearchKeyword])
	const [categorySearchQuery, setCategorySearchQuery] = useState("")

	const [selectedCategories, handleChangeCategories] =
		useSearchParamCategories()
	const [, order, handleChangeSortOrder] = useSearchParamsSortOrder(
		"createdAt",
		"desc"
	)

	const filteredCategories = useMemo(
		() =>
			categories?.filter((category) =>
				category.name
					.toLowerCase()
					.includes(categorySearchQuery.toLowerCase())
			) ?? [],
		[categories, categorySearchQuery]
	)

	const handleCheckStateChange = (
		checked: CheckedState,
		category: Category
	) => {
		if (checked) {
			handleChangeCategories([...selectedCategories, category._id])
		} else {
			handleChangeCategories(
				selectedCategories.filter((id) => id !== category._id)
			)
		}
	}

	const handleToggleOrder = () => {
		handleChangeSortOrder("createdAt", order === "desc" ? "asc" : "desc")
	}

	const clearFilters = () => {
		setKeyword("")
		setSearchKeyword(undefined)
		setSearchParams(new URLSearchParams())
	}

	return (
		<div className="">
			<div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
				{/* Search Bar */}
				<div className="relative flex-grow">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="text"
						placeholder="Search by title, author, or description..."
						className="pl-8 w-[500px]"
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
					/>
				</div>

				{/* Category Filter */}
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline" className="h-10">
							Categories
							{selectedCategories.length > 0 && (
								<Badge variant="secondary" className="ml-2">
									{selectedCategories.length}
								</Badge>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[250px] p-4" align="end">
						<div className="space-y-3">
							<h4 className="font-medium text-sm">
								Filter by category
							</h4>

							{/* Category search input */}
							<div className="relative">
								<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									type="text"
									placeholder="Search categories..."
									className="pl-8 h-9"
									value={categorySearchQuery}
									onChange={(e) =>
										setCategorySearchQuery(e.target.value)
									}
								/>
							</div>

							{/* Scrollable category list */}
							<div className="max-h-[200px] overflow-y-auto pr-1 -mr-1">
								<div className="grid gap-2">
									{filteredCategories.map((category) => (
										<div
											key={category._id}
											className="flex items-center space-x-2"
										>
											<Checkbox
												id={category._id}
												checked={selectedCategories.includes(
													category._id
												)}
												onCheckedChange={(checked) =>
													handleCheckStateChange(
														checked,
														category
													)
												}
											/>
											<Label
												htmlFor={category._id}
												className="text-sm font-normal cursor-pointer"
											>
												{category.name}
											</Label>
										</div>
									))}

									{filteredCategories.length === 0 && (
										<p className="text-sm text-muted-foreground py-2">
											No categories found
										</p>
									)}
								</div>
							</div>
						</div>
					</PopoverContent>
				</Popover>

				{/* Sort Order */}
				<Button
					variant="outline"
					className="h-10"
					onClick={handleToggleOrder}
				>
					{order === "desc" ? (
						<>
							<SortDesc className="mr-2 h-4 w-4" />
							Newest
						</>
					) : (
						<>
							<SortAsc className="mr-2 h-4 w-4" />
							Oldest
						</>
					)}
				</Button>

				{/* Clear Filters */}
				<Button
					variant="outline"
					className="h-10"
					onClick={clearFilters}
				>
					<Trash2 className="size-4 text-red-600" />
				</Button>
			</div>
		</div>
	)
}

export default BookFilter
