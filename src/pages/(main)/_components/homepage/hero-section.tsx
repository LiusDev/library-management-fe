import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { BookCarousel } from "./book-carousel"
import { Suspense } from "react"

const HeroSection = () => {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/10 via-primary/5 to-background overflow-hidden">
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
					<div className="flex flex-col justify-center space-y-4">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
								Discover Your Next Great Read
							</h1>
							<p className="max-w-[600px] text-muted-foreground md:text-xl">
								Borrow books from our extensive collection. Read
								anywhere, anytime, and return when you're done.
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
					<Suspense fallback={null}>
						<BookCarousel />
					</Suspense>
				</div>
			</div>
		</section>
	)
}

export default HeroSection
