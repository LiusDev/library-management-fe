import GoogleIcon from "@/components/icons/google"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { API_URL } from "@/utils/api"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"

const LoginPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const handleGoogleSignIn = async () => {
		try {
			setIsLoading(true)
			setError(null)
			console.log("Redirecting to Google OAuth...")

			window.location.replace(`${API_URL}/auth/google`)
		} catch (error) {
			console.error("An unexpected error occurred:", error)
			setError("An unexpected error occurred. Please try again.")
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<div className="min-h-screen w-full flex flex-col md:flex-row">
			{/* Left side - Image */}
			<div className="hidden md:flex md:w-1/2 relative bg-primary/10">
				<div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-10" />
				<img
					src="/placeholder.svg?height=1080&width=1080"
					alt="Books on shelves"
					className="object-cover"
					sizes="(max-width: 768px) 0vw, 50vw"
				/>
				<div className="absolute inset-0 flex flex-col justify-center items-start p-12 z-20">
					<h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-md">
						BookBuddy
					</h1>
					<p className="text-xl text-white max-w-md drop-shadow-md">
						Your personal library, anywhere you go. Borrow, read,
						and discover new worlds.
					</p>
				</div>
			</div>

			{/* Right side - Login */}
			<div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 bg-background">
				<div className="w-full max-w-md space-y-8">
					{/* Mobile logo */}
					<div className="md:hidden text-center mb-8">
						<h1 className="text-3xl font-bold text-primary">
							BookBuddy
						</h1>
						<p className="text-muted-foreground mt-2">
							Your personal library, anywhere you go.
						</p>
					</div>

					<div className="space-y-6">
						<div className="space-y-2 text-center">
							<h2 className="text-3xl font-bold tracking-tight">
								Welcome back
							</h2>
							<p className="text-muted-foreground">
								Sign in to your account to continue
							</p>
						</div>

						{error && (
							<Alert variant="destructive">
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}

						<div className="space-y-4">
							<Button
								variant="outline"
								className="w-full relative h-12 text-base"
								onClick={handleGoogleSignIn}
								disabled={isLoading}
							>
								{isLoading ? (
									<Loader2 className="mr-2 h-5 w-5 animate-spin" />
								) : (
									<GoogleIcon className="mr-2 h-5 w-5" />
								)}
								Sign in with Google
							</Button>

							<div className="flex items-center justify-center">
								<div className="h-px bg-border flex-1"></div>
								<span className="px-4 text-sm text-muted-foreground">
									or continue as guest
								</span>
								<div className="h-px bg-border flex-1"></div>
							</div>

							<Button
								variant="ghost"
								className="w-full h-12 text-base"
								asChild
							>
								<Link to="/">Browse Books</Link>
							</Button>
						</div>
					</div>

					<div className="text-center text-sm text-muted-foreground mt-8">
						<p>By signing in, you agree to our</p>
						<div className="flex justify-center space-x-2 mt-1">
							<button className="underline hover:text-primary">
								Terms of Service
							</button>
							<span>•</span>
							<button className="underline hover:text-primary">
								Privacy Policy
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
