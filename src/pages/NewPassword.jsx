import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import axiosClient from '../config/axios';


const NewPassword = () => {

    const { token } = useParams();
    const url = `/veterinarios/olvide-password/${token}`;

    const [ alerta, setAlerta ] = useState({});
    const [ cargando, setCargando ] = useState(true);
    const [ tokenValido, setTokenValido ] = useState(false);
    const [ passwordModificada, setPasswordModificada ] = useState(false);

    const [ password, setPassword ] = useState("");
    const [ repeatPassword, setRepeatPassword ] = useState("");

    useEffect(() => {
        
        const comprobarToken = async () => {
            try {
                const { data } = await axiosClient(url);
                setTimeout(()=> {
                    setCargando(false);
                    setTokenValido(true);
                }, 300)
            } catch (error) {
                setTimeout(()=> {
                    setCargando(false);
                    setAlerta({
                        msg: "Hubo un error con el enlace",
                        error: true
                    })
                }, 350)

            }
        }

        comprobarToken();
        
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();

        if([password, repeatPassword].includes("")){
            setAlerta({
                msg: "Hay inputs vacíos",
                error: true
            })
            return
        }

        if(password !== repeatPassword){
            setAlerta({
                msg: "La contraseñas no coinciden",
                error: true
            })
            return
        }
        
        if(password.length < 6 || repeatPassword.length < 6){
            setAlerta({
                msg: "La contraseña debe tener al menos 6 caracteres",
                error: true
            })
            return
        }

        try {
            const { data } = await axiosClient.post(url, { password });
            console.log(data.msg);
            setAlerta({
                msg: data.msg,
                error: false
            })
            setPasswordModificada(true)
        } catch (error) {
            console.log(error.response.data.msg);
            setAlerta({
                msg: error.response.data.msg,
                error: true
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

                {
                    cargando && 
                        (
                            <button disabled type="button" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-bold rounded-lg text-3xl mx-auto px-8 py-4 text-center my-40 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 flex justify-center items-center">
                                <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>
                                Loading...
                            </button>
                        )
    
                }                  

                {
                    tokenValido && 
                        
                        <form onSubmit={ handleSubmit }>
                            <div className="my-5">
                                <label className="uppercase block text-gray-600 font-bold text-xl pl-3">
                                    Nueva Contraseña
                                </label>
                                <input 
                                    type="password"
                                    value={ password }
                                    onChange={ e => setPassword(e.target.value) }
                                    placeholder="Ingresa tu nueva contraseña"
                                    autoComplete='new-password'
                                    className="border w-full p-3 mt-3 bg-gray-100 rounded-xl placeholder:text-slate-600 focus:bg-indigo-50 text-2xl placeholder:text-lg duration-300" 
                                />
                            </div>
        
                            <div className="my-5">
                                <label className="uppercase block text-gray-600 font-bold text-xl pl-3">
                                    Repetir Nueva Contraseña
                                </label>
                                <input 
                                    type="password"
                                    value={ repeatPassword }
                                    onChange={ e => setRepeatPassword(e.target.value) }
                                    placeholder="Repite tu nueva contraseña"
                                    autoComplete='repeat-new-password'
                                    className="border w-full p-3 mt-3 bg-gray-100 rounded-xl placeholder:text-slate-600 focus:bg-indigo-50 text-2xl placeholder:text-lg duration-300" 
                                />
                            </div>
        
                            <input 
                                type="submit"
                                value="guardar nueva contraseña"
                                className="block uppercase bg-indigo-700 w-full text-base font-bold py-3 px-4 mt-10 mx-auto text-white rounded-xl md:w-auto lg:px-10 lg:text-xl hover:bg-indigo-800 hover:cursor-pointer hover:-translate-y-0.5 duration-300"    
                            />
        
                        </form>
                        
                }

                {
                    alerta.msg && 
                        <Alerta 
                            alerta={ alerta }
                        />
                }   

                {
                    !cargando && passwordModificada &&
                        <nav className='mt-2 font-bold text-base md:text-lg lg:flex lg:justify-center'>
                            <Link 
                                to='/' 
                                className='block text-center my-5 text-gray-500 hover:text-gray-800 duration-300'>
                                    Inicia Sesión
                            </Link>
                        </nav>
                }
            </div>
        </>
    )
}

export default NewPassword