import { Star, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Link } from "react-router"

interface BookCardProps {
	id: string
	title: string
	author: string
	coverImage: string
	rating: number
	available: boolean
}

export default function BookCard({
	id,
	title,
	author,
	coverImage,
	rating,
	available,
}: BookCardProps) {
	return (
		<Card className="overflow-hidden transition-all hover:shadow-lg">
			<Link to={`/books/${id}`}>
				<div className="relative aspect-[2/3] w-full overflow-hidden">
					<img
						src={coverImage || "/placeholder.svg"}
						alt={title}
						className="object-cover transition-transform hover:scale-105"
					/>
					{!available && (
						<div className="absolute inset-0 flex items-center justify-center bg-black/60">
							<Badge variant="destructive" className="text-sm">
								Currently Unavailable
							</Badge>
						</div>
					)}
				</div>
			</Link>
			<CardHeader className="p-4">
				<Link to={`/books/${id}`} className="hover:underline">
					<h3 className="font-bold line-clamp-1">{title}</h3>
				</Link>
				<p className="text-sm text-muted-foreground">{author}</p>
			</CardHeader>
			<CardContent className="p-4 pt-0">
				<div className="flex items-center gap-1">
					<Star className="h-4 w-4 fill-primary text-primary" />
					<span className="text-sm font-medium">
						{rating.toFixed(1)}
					</span>
				</div>
			</CardContent>
			<CardFooter className="p-4 pt-0">
				{available ? (
					<Button className="w-full" size="sm">
						<Clock className="mr-2 h-4 w-4" />
						Borrow Now
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
