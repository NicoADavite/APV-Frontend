import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import axiosClient from "../config/axios"

const Login = () => {
	const navigate = useNavigate()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const [alerta, setAlerta] = useState({})

	const handleSubmit = async e => {
		e.preventDefault()

		if ([email, password].includes("")) {
			setAlerta({
				msg: "hay inputs vacíos",
				error: true,
			})
			return
		}

		if (email.length < 6) {
			setAlerta({
				msg: "correo no valido",
				error: true,
			})
			return
		}

		if (password.length < 6) {
			setAlerta({
				msg: "la contraseña debe contener al menos 6 caracteres",
				error: true,
			})
			return
		}

		try {
			const { data } = await axiosClient.post("/veterinarios/login", {
				email,
				password,
			})
			localStorage.setItem("token", data.token)
			navigate("/admin")
		} catch (error) {
			console.log(error.response)
		}
	}

	return (
		<>
			<div className="login-title-container">
				<h1 className="text-indigo-600 font-black p-1 text-center text-4xl md:text-left md:text-5xl xl:text-6xl drop-shadow-2xl ">
					Inicia Sesión y Administra {""}
					<span className="text-black block">tus Pacientes</span>
				</h1>
				{/* <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Tailwind CSS
        </h1> */}
			</div>

			<div className="mt-12 md:mt-5 shadow-lg shadow-indigo-200 px-6 py-10 rounded-xl bg-white">
				<form onSubmit={handleSubmit}>
					<div className="my-5">
						<label className="uppercase block text-gray-600 font-bold text-xl pl-3">
							Email
						</label>
						<input
							type="email"
							value={email}
							autoComplete="username"
							onChange={e => setEmail(e.target.value)}
							placeholder="Ingresa tu correo"
							className="border w-full p-3 mt-3 bg-gray-100 rounded-xl placeholder:text-slate-600 focus:bg-indigo-50 text-2xl placeholder:text-lg duration-300"
						/>
					</div>
					<div className="my-5">
						<label className="uppercase block text-gray-600 font-bold text-xl pl-3">
							Contraseña
						</label>
						<input
							type="password"
							value={password}
							autoComplete="current-password"
							onChange={e => setPassword(e.target.value)}
							placeholder="Ingresa tu contraseña"
							className="border w-full p-3 mt-3 bg-gray-100 rounded-xl placeholder:text-slate-600 focus:bg-indigo-50 text-2xl placeholder:text-lg duration-300"
						/>
					</div>

					<input
						type="submit"
						value="Iniciar Sesión"
						className="block uppercase bg-indigo-700 w-full text-xl font-bold py-3 px-10 mt-10 mx-auto text-white rounded-xl md:w-auto hover:bg-indigo-800 hover:cursor-pointer hover:-translate-y-0.5 duration-300"
					/>
				</form>

				{alerta.msg && <Alerta>alerta={alerta}</Alerta>}

				<nav className="mt-2 font-bold text-base md:text-lg lg:flex lg:justify-between">
					<Link
						to="/register"
						className="block text-center my-5 text-gray-500 hover:text-gray-800 duration-300"
					>
						¿No tienes cuenta? Regístrate
					</Link>
					<Link
						to="/forgot-password"
						className="block text-center my-5 text-gray-500 hover:text-gray-800 duration-300"
					>
						Olvidé mi contraseña
					</Link>
				</nav>
			</div>
		</>
	)
}

export default Login
