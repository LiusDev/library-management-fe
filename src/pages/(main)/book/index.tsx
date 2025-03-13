import { Suspense } from "react"
import { BooksList } from "./_components/books-list"
import BookFilter from "./_components/book-filter"

export default function BooksPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-1">
				<div className="container mx-auto px-4 py-6 md:px-6 md:py-12">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div>
							<h1 className="text-3xl font-bold tracking-tight">
								Browse Books
							</h1>
							<p className="text-muted-foreground">
								Discover your next favorite read from our
								collection.
							</p>
						</div>
						<BookFilter />
					</div>
					<Suspense fallback={<div>Loading...</div>}>
						<BooksList />
					</Suspense>
				</div>
			</main>
		</div>
	)
}
