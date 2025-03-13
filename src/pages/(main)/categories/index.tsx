import { Suspense } from "react"
import CategoriesList from "./_components/categories-list"
import { CategoryCardSkeleton } from "@/components/category-card"

const CategoriesPage = () => {
	return (
		<main className="flex-1">
			<div className="container mx-auto px-4 py-6 md:px-6 md:py-12">
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">
							Browse by Category
						</h1>
						<p className="text-muted-foreground">
							Find your favorite genre or discover something new.
						</p>
					</div>
				</div>
				<Suspense
					fallback={
						<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{Array.from({ length: 12 }).map((_, index) => (
								<CategoryCardSkeleton key={index} />
							))}
						</div>
					}
				>
					<CategoriesList />
				</Suspense>
			</div>
		</main>
	)
}

export default CategoriesPage
