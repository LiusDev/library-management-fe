import HomePage from "@/pages"
import { createBrowserRouter, RouterProvider } from "react-router"

const routers = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
])

export const ReactRouterProvider = () => {
	return <RouterProvider router={routers} />
}
