import { Outlet } from "react-router-dom"

const AuthLayout = () => {
	return (
		<>
			<main className="container my-12 mx-auto p-5 md:p-2 md:grid md:grid-cols-2 md:gap-24 md:w-5/6 xl:gap-0 items-center">
				<Outlet />
			</main>
		</>
	)
}

export default AuthLayout
