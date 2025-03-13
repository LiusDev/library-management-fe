import { ChevronRight } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Link } from "react-router"
import { Category } from "@/types"

interface CategoryCardProps {
	category: Category & {
		bookCount: number
	}
	color: string
}

export default function CategoryCard({ category, color }: CategoryCardProps) {
	return (
		<Link to={`/categories/${category._id}`}>
			<Card className="overflow-hidden p-0 transition-all hover:shadow-lg">
				<CardContent className={`flex items-center gap-4 p-6 ${color}`}>
					<div className="text-4xl">📚</div>
					<div className="space-y-1">
						<h3 className="font-bold">{category.name}</h3>
						<p className="text-sm text-muted-foreground">
							{category.bookCount} books
						</p>
					</div>
				</CardContent>
				<CardFooter className="p-4 flex justify-end">
					<div className="flex items-center text-sm text-primary">
						Browse category{" "}
						<ChevronRight className="ml-1 h-4 w-4" />
					</div>
				</CardFooter>
			</Card>
		</Link>
	)
}
