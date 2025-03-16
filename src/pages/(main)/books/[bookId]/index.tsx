import { Badge } from "@/components/ui/badge"
import { Link, useParams } from "react-router"
import { borrowBook, useBook, useBooks } from "@/services/book.service"
import ErrorPage from "@/pages/404"
import { format, parseISO } from "date-fns"
import BookCard, { BookCardSkeleton } from "@/components/book-card"
import { BookOpen, ChevronLeft } from "lucide-react"
import { useMemo, useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useDialog } from "@/providers"
import { Book } from "@/types"
import { toast } from "sonner"

const ConfirmBorrowDialog = ({
	book,
	period,
}: {
	book: Book | undefined
	period: string
}) => {
	const dialog = useDialog()
	const [loading, setLoading] = useState(false)
	const handleBorrow = async () => {
		setLoading(true)
		try {
			await borrowBook(book?._id, period)
			toast.success("Book borrowed successfully")
			dialog.closeAll()
		} catch (error) {
			console.error(error)
			toast.error("An error occurred while borrowing the book")
		} finally {
			setLoading(false)
		}
	}

	if (!book) return null
	return (
		<div>
			<p>
				Are you sure you want to borrow this book for {period} week
				{+period > 1 && "s"}
			</p>
			<div className="mt-4 flex justify-end gap-4">
				<Button
					variant="ghost"
					onClick={dialog.closeAll}
					disabled={loading}
				>
					Cancel
				</Button>
				<Button disabled={loading} onClick={handleBorrow}>
					Confirm
				</Button>
			</div>
		</div>
	)
}

export default function BookDetailsPage() {
	const { bookId } = useParams()
	const { data: book, isLoading } = useBook(bookId)
	const { data, isLoading: relatedBooksLoading } = useBooks(
		undefined,
		book?.category.map((c) => c._id),
		undefined,
		undefined,
		1,
		5
	)
	const relatedBooks = useMemo(
		() => data?.data.filter((b) => b._id !== bookId),
		[data, bookId]
	)

	const isAvailable = useMemo(() => {
		if (!book) return false
		return book.available > 0
	}, [book])

	const [borrowPeriod, setBorrowPeriod] = useState("2")

	const dialog = useDialog()

	const handleOpenDialog = () => {
		dialog.open({
			title: "Confirm Borrow",
			children: <ConfirmBorrowDialog book={book} period={borrowPeriod} />,
		})
	}

	if (isLoading) {
		return (
			<main className="flex-1">
				<div className="container mx-auto px-4 py-6 md:px-6 md:py-12">
					<div className="flex items-center justify-center h-[80vh]">
						<svg
							className="mr-3 -ml-1 size-5 animate-spin text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
					</div>
				</div>
			</main>
		)
	}

	if (!book) {
		return <ErrorPage />
	}

	return (
		<main className="flex-1">
			<div className="container mx-auto px-4 py-6 md:px-6 md:py-12">
				<Link
					to="/books"
					className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
				>
					<ChevronLeft className="h-4 w-4" /> Back to Books
				</Link>

				<div className="grid gap-6 lg:grid-cols-4 lg:gap-12">
					<div className="space-y-4 col-span-1">
						<div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg border">
							<img
								src={book?.cover || "/placeholder.svg"}
								alt={book?.title}
								className="object-cover size-full object-center"
							/>
						</div>
					</div>

					<div className="space-y-6 col-span-2">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold tracking-tight md:text-4xl">
								{book.title}
							</h1>
							<p className="text-xl text-muted-foreground">
								by {book.author}
							</p>
						</div>

						<div className="flex flex-wrap gap-2">
							{book.category.map((category) => (
								<Link
									to={`/categories/${category._id}`}
									key={category._id}
								>
									<Badge className="rounded-full">
										{category.name}
									</Badge>
								</Link>
							))}
						</div>

						<p>{book.description}</p>

						<div className="grid grid-cols-3 gap-4 items-center">
							<p className="text-sm text-muted-foreground col-span-1">
								Published
							</p>
							<p className="font-medium col-span-2">
								{format(
									parseISO(book.publishedDate),
									"dd/MM/yyyy"
								)}
							</p>
							<p className="text-sm text-muted-foreground col-span-1">
								Status
							</p>
							<p className="font-medium col-span-2">
								{isAvailable ? "Available" : "Unavailable"}
							</p>
						</div>
					</div>
					{isAvailable ? (
						<div className="col-span-1 space-y-4">
							<h3 className="font-medium">
								Select Borrowing Period
							</h3>
							<RadioGroup
								defaultValue="2"
								value={borrowPeriod}
								onValueChange={setBorrowPeriod}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="1" id="1week" />
									<Label htmlFor="1week">1 Week</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="2" id="2weeks" />
									<Label htmlFor="2weeks">2 Weeks</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="3" id="3weeks" />
									<Label htmlFor="3weeks">3 Weeks</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="4" id="4weeks" />
									<Label htmlFor="4weeks">4 Weeks</Label>
								</div>
							</RadioGroup>
							<Button
								className="w-full"
								onClick={handleOpenDialog}
							>
								<BookOpen className="mr-1 size-4" />
								Borrow
							</Button>
						</div>
					) : null}
				</div>

				<div className="mt-12 space-y-6">
					<div className="flex items-center justify-between">
						<h2 className="text-2xl font-bold tracking-tight">
							Related Books
						</h2>

						<Button variant={"ghost"} asChild>
							<Link
								to={`/books?${book.category
									.map((c) => "categories=" + c._id)
									.join("&")}`}
							>
								View all
							</Link>
						</Button>
					</div>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{relatedBooksLoading
							? Array.from({ length: 4 }).map((_, i) => (
									<BookCardSkeleton key={i} />
							  ))
							: relatedBooks.map((relatedBook) => (
									<BookCard
										key={relatedBook._id}
										book={relatedBook}
									/>
							  ))}
					</div>
				</div>
			</div>
		</main>
	)
}
