import { Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Link } from "react-router"
import { Book } from "@/types"

interface BookCardProps {
	book: Book
}

export const BookCardSkeleton = () => (
	<Card className="overflow-hidden pt-0">
		<Skeleton className="aspect-[4/5] w-full" />
		<CardHeader className="px-4 pt-0">
			<Skeleton className="w-1/2" />
			<Skeleton className="w-1/4" />
		</CardHeader>
		<CardContent className="px-4 pt-0 flex flex-wrap gap-2">
			<Skeleton className="w-1/4" />
			<Skeleton className="w-1/4" />
			<Skeleton className="w-1/4" />
		</CardContent>
		<CardFooter className="p-4 pt-0 pb-0">
			<Skeleton className="w-full" />
		</CardFooter>
	</Card>
)

export default function BookCard({ book }: BookCardProps) {
	return (
		<Card className="overflow-hidden transition-all hover:shadow-lg pt-0">
			<Link to={`/books/${book._id}`}>
				<div className="relative aspect-[4/5] w-full overflow-hidden">
					<img
						src={book.cover || "/placeholder.svg"}
						alt={book.title}
						className="object-cover transition-transform hover:scale-105 size-full"
					/>
					{book.quantity === 0 && (
						<div className="absolute inset-0 flex items-center justify-center bg-black/60">
							<Badge variant="destructive" className="text-sm">
								Currently Unavailable
							</Badge>
						</div>
					)}
				</div>
			</Link>
			<CardHeader className="px-4 pt-0">
				<Link to={`/books/${book._id}`} className="hover:underline">
					<h3 className="font-bold text-xl line-clamp-1">
						{book.title}
					</h3>
				</Link>
				<p className="text-sm text-muted-foreground">{book.author}</p>
			</CardHeader>
			<CardContent className="px-4 pt-0 flex flex-wrap gap-2">
				{book.category.map((category) => (
					<Badge
						key={category._id}
						variant="outline"
						className="rounded-full"
					>
						{category.name}
					</Badge>
				))}
			</CardContent>
			<CardFooter className="p-4 pt-0 pb-0">
				{book.quantity > 0 ? (
					<Button className="w-full" size="sm" asChild>
						<Link to={`/books/${book._id}`}>
							<Clock className="mr-2 h-4 w-4" />
							Borrow Now
						</Link>
					</Button>
				) : (
					<Button
						className="w-full"
						size="sm"
						variant="outline"
						disabled
					>
						Unavailable
					</Button>
				)}
			</CardFooter>
		</Card>
	)
}
