const Alerta = ({ alerta }) => {
	return (
		<div
			className={`${
				alerta.error ? "from-red-400 to-red-600" : "from-green-400 to-green-600"
			} bg-gradient-to-br text-center font-bold text-base text-white p-3 uppercase rounded-xl mt-6 w-10/12 mx-auto`}
		>
			{alerta.msg}
		</div>
	)
}

export default Alerta
