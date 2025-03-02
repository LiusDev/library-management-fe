import { Outlet } from "react-router"
import Header from "./_components/header"

const MainLayout = () => {
	return (
		<>
			<Header />
			<div className="bg-neutral-100 pt-16 flex flex-col min-h-screen">
				<Outlet />
			</div>
		</>
	)
}

export default MainLayout
