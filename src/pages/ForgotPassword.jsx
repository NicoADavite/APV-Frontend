import { useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../config/axios"
import Alerta from "../components/Alerta"

const ForgotPassword = () => {
	const [email, setEmail] = useState("")
	const [alerta, setAlerta] = useState({})

	const handleSubmit = async e => {
		e.preventDefault()

		if ([email].includes("")) {
			console.log("error")
			setAlerta({
				msg: "Debes ingresar un email",
				error: true,
			})
			return
		}

		if (email.length < 6) {
			console.log("error")
			setAlerta({
				msg: "Email no válido",
				error: true,
			})
			return
		}

		try {
			const url = "/veterinarios/olvide-password"

			const { data } = await axiosClient.post(url, { email })
			setAlerta({
				msg: data.msg,
				error: false,
			})
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			})
		}
	}

	return (
		<>
			<div>
				<h1 className="text-indigo-600 font-black p-1 text-center text-4xl md:text-left md:text-5xl xl:text-6xl drop-shadow-2xl ">
					Recupera el Acceso {""}
					<span className="block"> y no Pierdas a</span> {""}
					<span className="text-black block">tus Pacientes</span>
				</h1>
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
							onChange={e => setEmail(e.target.value)}
							placeholder="Ingresa tu correo"
							className="border w-full p-3 mt-3 bg-gray-100 rounded-xl placeholder:text-slate-600 focus:bg-indigo-50 text-2xl placeholder:text-lg duration-300"
						/>
					</div>

					<input
						type="submit"
						value="Recuperar Contraseña"
						className="block uppercase bg-indigo-700 w-full text-base font-bold py-3 px-4 mt-10 mx-auto text-white rounded-xl md:w-auto lg:px-10 lg:text-xl hover:bg-indigo-800 hover:cursor-pointer hover:-translate-y-0.5 duration-300"
					/>

					{alerta.msg && <Alerta alerta={alerta} />}
				</form>

				<nav className="mt-2 font-bold text-base md:text-lg lg:flex lg:justify-between">
					<Link
						to="/"
						className="block text-center my-5 text-gray-500 hover:text-gray-800 duration-300"
					>
						¿Ya tienes cuenta? Inicia Sesión
					</Link>
					<Link
						to="/register"
						className="block text-center my-5 text-gray-500 hover:text-gray-800 duration-300"
					>
						¿No tienes cuenta? Regístrate
					</Link>
				</nav>
			</div>
		</>
	)
}

export default ForgotPassword
