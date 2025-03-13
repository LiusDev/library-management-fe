import BookCard from "@/components/book-card"
import { useBooks } from "@/services/book.service"
import { ChevronRight } from "lucide-react"
import { Suspense, useMemo } from "react"
import { Link } from "react-router"

const ListBooks = () => {
	const { data } = useBooks(undefined, undefined, undefined, undefined, 1, 4)

	const books = useMemo(() => {
		return data.data
	}, [data.data])

	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
			{books.map((book) => (
				<BookCard key={book._id} book={book} />
			))}
		</div>
	)
}

const BooksSection = () => {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
							Hot Books
						</h2>
						<p className="max-w-[600px] text-muted-foreground md:text-xl">
							Our most popular books that readers can't put down.
						</p>
					</div>
					<Link
						to="/books"
						className="flex items-center gap-1 text-primary hover:underline"
					>
						View all books <ChevronRight className="h-4 w-4" />
					</Link>
				</div>
				<Suspense fallback={<div>Loading...</div>}>
					<ListBooks />
				</Suspense>
			</div>
		</section>
	)
}

export default BooksSection
