import { Toaster } from "@/components/ui/sonner"
import AuthLayout from "@/pages/(auth)/layout"
import LoginPage from "@/pages/(auth)/login"
import HomePage from "@/pages/(main)"
import BooksPage from "@/pages/(main)/books"
import BookDetailsPage from "@/pages/(main)/books/[bookId]"
import CategoriesPage from "@/pages/(main)/categories"
import MainLayout from "@/pages/(main)/layout"
import ErrorPage from "@/pages/404"
import AddPhonePage from "@/pages/add-phone"
import { authLoader, nonAuthLoader } from "@/utils/loader"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router"

const routers = createBrowserRouter([
	{
		path: "/",
		element: (
			<>
				<Outlet />
				<Toaster />
			</>
		),
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <AuthLayout />,
				loader: nonAuthLoader,
				children: [
					{
						path: "/login",
						element: <LoginPage />,
					},
				],
			},
			{
				path: "/add-phone",
				element: <AddPhonePage />,
			},
			{
				path: "/",
				element: <MainLayout />,
				loader: authLoader,
				children: [
					{
						index: true,
						element: <HomePage />,
					},
					{
						path: "/books",
						element: <Outlet />,
						children: [
							{
								index: true,
								element: <BooksPage />,
							},
							{
								path: ":bookId",
								element: <BookDetailsPage />,
							},
						],
					},
					{
						path: "/categories",
						element: <Outlet />,
						children: [
							{
								index: true,
								element: <CategoriesPage />,
							},
						],
					},
				],
			},
		],
	},
])

export const ReactRouterProvider = () => {
	return <RouterProvider router={routers} />
}
