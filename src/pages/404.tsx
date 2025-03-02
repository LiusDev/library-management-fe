import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export default function ErrorPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 md:px-6">
			<div className="mx-auto w-full max-w-md text-center sm:max-w-lg md:max-w-2xl">
				<div className="mb-8 flex justify-center">
					<div className="relative h-40 w-40">
						<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
							<div className="flex flex-col items-center justify-center">
								<div className="text-9xl font-bold text-primary">
									404
								</div>
								<div className="mt-2 text-xl font-medium">
									Page Not Found
								</div>
							</div>
						</div>
						<div className="absolute left-0 top-0 h-full w-full">
							<svg
								className="h-full w-full text-muted-foreground/20"
								viewBox="0 0 100 100"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M10,10 L90,10 L90,90 L10,90 Z"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									fill="none"
								/>
								<path
									d="M20,20 L80,20"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M20,30 L80,30"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M20,40 L60,40"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					</div>
				</div>
				<h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
					We couldn't find that book
				</h1>
				<p className="mt-4 text-muted-foreground md:text-lg">
					The page you're looking for doesn't exist or has been moved.
					browse our popular categories.
				</p>

				<div className="mt-8 flex flex-wrap justify-center gap-4">
					<Button asChild variant="outline">
						<Link to="/">Return Home</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
