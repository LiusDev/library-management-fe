import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/store/useAuthStore"
import { BookOpen } from "lucide-react"
import { Link, useNavigate } from "react-router"

const Header = () => {
	const { user, logout } = useAuth()
	const navigate = useNavigate()
	const handleLogout = async () => {
		await logout()
		navigate("/login")
	}
	return (
		<header className="fixed top-0 left-0 right-0 border-b z-30 bg-white">
			<div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
				<Link to="/" className="flex items-center gap-2">
					<BookOpen className="h-6 w-6" />
					<span className="text-xl font-bold">BookBuddy</span>
				</Link>
				<nav className="hidden md:flex gap-6">
					<Link
						to="/"
						className="text-sm font-medium hover:underline underline-offset-4"
					>
						Home
					</Link>
					<Link
						to="/books"
						className="text-sm font-medium hover:underline underline-offset-4"
					>
						Books
					</Link>
					<Link
						to="/categories"
						className="text-sm font-medium hover:underline underline-offset-4"
					>
						Categories
					</Link>
					<Link
						to="/about"
						className="text-sm font-medium hover:underline underline-offset-4"
					>
						About
					</Link>
				</nav>
				<div className="flex items-center gap-4">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Avatar className="cursor-pointer">
								<AvatarImage src={user?.avatar} />
								<AvatarFallback>U</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={handleLogout}>
								Sign out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	)
}

export default Header
