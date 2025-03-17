import { Toaster } from "@/components/ui/sonner"
import AuthLayout from "@/pages/(auth)/layout"
import LoginPage from "@/pages/(auth)/login"
import HomePage from "@/pages/(main)"
import BooksPage from "@/pages/(main)/books"
import BookDetailsPage from "@/pages/(main)/books/[bookId]"
import BorrowTransactionsPage from "@/pages/(main)/borrow-transactions"
import CategoriesPage from "@/pages/(main)/categories"
import MainLayout from "@/pages/(main)/layout"
import ErrorPage from "@/pages/404"
import AddPhonePage from "@/pages/add-phone"
import { authLoader, nonAuthLoader } from "@/utils/loader"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router"
import { DialogProvider } from "./dialog/DialogProvider"

const routers = createBrowserRouter([
	{
		path: "/",
		element: (
			<DialogProvider>
				<Outlet />
				<Toaster />
			</DialogProvider>
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
				loader: authLoader,
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
					{
						path: "/borrow-transactions",
						element: <Outlet />,
						children: [
							{
								index: true,
								element: <BorrowTransactionsPage />,
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
