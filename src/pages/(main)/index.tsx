import BookCard from "@/components/book-card"
import CategoryCard from "@/components/category-card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router"

console.log(import.meta.env.MODE)

function HomePage() {
	return (
		<main className="flex-1">
			<section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
				<div className="container mx-auto px-4 md:px-6">
					<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
						<div className="flex flex-col justify-center space-y-4">
							<div className="space-y-2">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
									Discover Your Next Great Read
								</h1>
								<p className="max-w-[600px] text-muted-foreground md:text-xl">
									Borrow books from our extensive collection.
									Read anywhere, anytime, and return when
									you're done.
								</p>
							</div>
							<div className="flex flex-col gap-2 min-[400px]:flex-row">
								<Link to="/books">
									<Button size="lg">Browse Books</Button>
								</Link>
								<Link to="/categories">
									<Button size="lg" variant="outline">
										Explore Categories
									</Button>
								</Link>
							</div>
						</div>
						<img
							src="/placeholder.svg?height=550&width=450"
							alt="Hero Image of Books"
							className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
						/>
					</div>
				</div>
			</section>

			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container mx-auto px-4 md:px-6">
					<div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
								Hot Books
							</h2>
							<p className="max-w-[600px] text-muted-foreground md:text-xl">
								Our most popular books that readers can't put
								down.
							</p>
						</div>
						<Link
							to="/books"
							className="flex items-center gap-1 text-primary hover:underline"
						>
							View all books <ChevronRight className="h-4 w-4" />
						</Link>
					</div>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
						<BookCard
							id="1"
							title="The Midnight Library"
							author="Matt Haig"
							coverImage="/placeholder.svg?height=400&width=300"
							rating={4.5}
							available={true}
						/>
						<BookCard
							id="2"
							title="Atomic Habits"
							author="James Clear"
							coverImage="/placeholder.svg?height=400&width=300"
							rating={4.8}
							available={true}
						/>
						<BookCard
							id="3"
							title="The Song of Achilles"
							author="Madeline Miller"
							coverImage="/placeholder.svg?height=400&width=300"
							rating={4.7}
							available={false}
						/>
						<BookCard
							id="4"
							title="Project Hail Mary"
							author="Andy Weir"
							coverImage="/placeholder.svg?height=400&width=300"
							rating={4.6}
							available={true}
						/>
					</div>
				</div>
			</section>

			<section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
				<div className="container mx-auto px-4 md:px-6">
					<div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
								Browse by Category
							</h2>
							<p className="max-w-[600px] text-muted-foreground md:text-xl">
								Find your favorite genre or discover something
								new.
							</p>
						</div>
						<Link
							to="/categories"
							className="flex items-center gap-1 text-primary hover:underline"
						>
							View all categories{" "}
							<ChevronRight className="h-4 w-4" />
						</Link>
					</div>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
						<CategoryCard
							name="Fiction"
							icon="📚"
							bookCount={120}
							color="bg-blue-100"
						/>
						<CategoryCard
							name="Science & Technology"
							icon="🔬"
							bookCount={85}
							color="bg-green-100"
						/>
						<CategoryCard
							name="Business & Economics"
							icon="💼"
							bookCount={67}
							color="bg-yellow-100"
						/>
						<CategoryCard
							name="Biography"
							icon="👤"
							bookCount={42}
							color="bg-purple-100"
						/>
					</div>
				</div>
			</section>

			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container mx-auto px-4 md:px-6">
					<div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
						<img
							src="/placeholder.svg?height=550&width=450"
							width={550}
							height={450}
							alt="Person reading a book"
							className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
						/>
						<div className="flex flex-col justify-center space-y-4">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
									How It Works
								</h2>
								<p className="max-w-[600px] text-muted-foreground md:text-xl">
									Borrowing books has never been easier.
									Follow these simple steps to get started.
								</p>
							</div>
							<ul className="grid gap-6">
								<li className="flex items-start gap-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
										1
									</div>
									<div className="space-y-1">
										<h3 className="text-xl font-bold">
											Browse our collection
										</h3>
										<p className="text-muted-foreground">
											Explore our extensive library of
											books across various genres and
											topics.
										</p>
									</div>
								</li>
								<li className="flex items-start gap-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
										2
									</div>
									<div className="space-y-1">
										<h3 className="text-xl font-bold">
											Select your books
										</h3>
										<p className="text-muted-foreground">
											Choose the books you want to borrow
											and add them to your reading list.
										</p>
									</div>
								</li>
								<li className="flex items-start gap-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
										3
									</div>
									<div className="space-y-1">
										<h3 className="text-xl font-bold">
											Set borrowing duration
										</h3>
										<p className="text-muted-foreground">
											Select how long you'd like to borrow
											each book, from 1 to 4 weeks.
										</p>
									</div>
								</li>
							</ul>
							<div className="flex flex-col gap-2 min-[400px]:flex-row">
								<Link to="/books">
									<Button size="lg">Start Borrowing</Button>
								</Link>
								<Link to="/about">
									<Button size="lg" variant="outline">
										Learn More
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default HomePage
