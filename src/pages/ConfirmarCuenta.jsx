import { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import axiosClient from '../config/axios';
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {

    const [ cuentaConfirmada, setCuentaConfirmada ] = useState(false);
    const [ cargando, setCargando ] = useState(true);
    const [ alerta, setAlerta ] = useState({});


    const params = useParams();
    const { token } = params;
        
    useEffect( () => {
        const comprobarToken = async () => {
            try {
                const url = `/veterinarios/confirmar/${token}`;
                const { data } = await axiosClient(url);
                setCuentaConfirmada(true);
                setAlerta({
                    msg: data.msg,
                    error: false
                })

                console.log(data.msg);
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }

            setCargando(false)
        }
        comprobarToken();
    }, [])
    

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black p-1 text-center text-4xl md:text-left md:text-5xl xl:text-6xl drop-shadow-2xl ">
                    Confirma tu Cuenta y Administra {""}
                    <span className="text-black block">tus Pacientes</span>
                </h1>
            </div>
            
            <div className="mt-12 md:mt-5 shadow-lg shadow-indigo-200 px-6 pt-6 pb-12 rounded-xl bg-white">
                
                {
                    !cargando && 
                        <Alerta
                            alerta={ alerta }
                        />  
                } 

                {
                    cuentaConfirmada &&
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

export default ConfirmarCuenta