import CategoryCard from "@/components/category-card"
import { useCategories } from "@/services/category.service"
import { categoryBgColors } from "@/utils/constant"
import { ChevronRight } from "lucide-react"
import { Suspense, useMemo } from "react"
import { Link } from "react-router"

const CategoriesList = () => {
	const { data } = useCategories(1, 4)
	const categories = useMemo(() => data?.data, [data])

	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
			{categories?.map((category, index) => (
				<CategoryCard
					key={category._id}
					category={category}
					color={categoryBgColors[index]}
				/>
			))}
		</div>
	)
}

const CategoriesSection = () => {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
							Browse by Category
						</h2>
						<p className="max-w-[600px] text-muted-foreground md:text-xl">
							Find your favorite genre or discover something new.
						</p>
					</div>
					<Link
						to="/categories"
						className="flex items-center gap-1 text-primary hover:underline"
					>
						View all categories <ChevronRight className="h-4 w-4" />
					</Link>
				</div>
				<Suspense fallback={<div>Loading...</div>}>
					<CategoriesList />
				</Suspense>
			</div>
		</section>
	)
}

export default CategoriesSection
