import CategoryCard from "@/components/category-card"
import { useCategories } from "@/services/category.service"
import { categoryBgColors } from "@/utils/constant"
import { useMemo } from "react"

const CategoriesList = () => {
	const { data } = useCategories(1, 100)
	const categories = useMemo(() => data?.data, [data])
	return (
		<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{categories.map((category, index) => (
				<CategoryCard
					key={category._id}
					category={category}
					color={categoryBgColors[index]}
				/>
			))}
		</div>
	)
}

export default CategoriesList
