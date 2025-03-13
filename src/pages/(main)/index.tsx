import HeroSection from "./_components/homepage/hero-section"
import BooksSection from "./_components/homepage/books-section"
import CategoriesSection from "./_components/homepage/categories-section"

function HomePage() {
	return (
		<main className="flex-1">
			<HeroSection />
			<BooksSection />
			<CategoriesSection />
		</main>
	)
}

export default HomePage
