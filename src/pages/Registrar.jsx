import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../config/axios'
import Alerta from '../components/Alerta';

const Registrar = () => {

    const [ nombre, setNombre ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repeatPassword, setRepeatPassword ] = useState('');

    const [ alerta, setAlerta ] = useState({});

    const handleSubmit = async e => {

        e.preventDefault();

        if([ nombre, email, password, repeatPassword ].includes("")){
            setAlerta({ msg: 'Hay inputs vacíos', error: true })
            return
        }

        if( password.length < 6 || repeatPassword.length < 6  ){
            setAlerta({ msg: 'Las contraseñas debe contener al menos 6 caracteres', error: true })
            return
        }
        
        if( password !== repeatPassword ){
            setAlerta({ msg: 'Las contraseñas no coinciden', error: true })
            return
        }

        

        try {
            const url = `/veterinarios`;

            const { data } = await axiosClient.post( url, { nombre, email, password });

            console.log(data.info);
            
            setAlerta({ msg: "Usuario registrado correctamente, revisa tu email", error: false });

        } catch (error) {

            setAlerta({ msg: error.response.data.msg, error: true });

        }

    }

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black p-1 text-center text-4xl md:text-left md:text-5xl xl:text-6xl drop-shadow-2xl ">
                    Crea tu Cuenta y Administra {""}
                    <span className="text-black block">tus Pacientes</span>
                </h1>
            </div>
            
            <div className="mt-12 md:mt-5 shadow-lg shadow-indigo-200 px-6 py-10 rounded-xl bg-white">
                <form onSubmit={ handleSubmit }>

                    <div className="my-5">
                        <label className="uppercase block text-gray-600 font-bold text-xl pl-3">
                            Nombre
                        </label>
                        <input 
                            type="text"
                            id='nombre'
                            value={ nombre }
                            onChange={ e => setNombre(e.target.value) }
                            placeholder="Ingresa tu nombre"
                            autoComplete="new-name"
                            className="border w-full p-3 mt-3 bg-gray-100 rounded-xl placeholder:text-slate-600 focus:bg-indigo-50 text-2xl placeholder:text-lg duration-300" 
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase block text-gray-600 font-bold text-xl pl-3">
                            Email
                        </label>
                        <input 
                            type="email"
                            id='email'
                            value={ email }
                            onChange={ e => setEmail(e.target.value) }
                            placeholder="Ingresa tu correo"
                            autoComplete="new-email"
                            className="border w-full p-3 mt-3 bg-gray-100 rounded-xl placeholder:text-slate-600 focus:bg-indigo-50 text-2xl placeholder:text-lg duration-300" 
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase block text-gray-600 font-bold text-xl pl-3">
                            Contraseña
                        </label>
                        <input 
                            type="password"
                            id='password'
                            value={ password }
                            onChange={ e => setPassword(e.target.value) }
                            placeholder="Ingresa tu contraseña"
                            autoComplete="new-password"
                            className="border w-full p-3 mt-3 bg-gray-100 rounded-xl placeholder:text-slate-600 focus:bg-indigo-50 text-2xl placeholder:text-lg duration-300" 
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase block text-gray-600 font-bold text-xl pl-3">
                            Repetir Contraseña
                        </label>
                        <input 
                            type="password"
                            id='repeatPassword'
                            value={ repeatPassword }
                            onChange={ e => setRepeatPassword(e.target.value) }
                            autoComplete="new-password"
                            placeholder="Ingresa tu contraseña nuevamente" 
                            className="border w-full p-3 mt-3 bg-gray-100 rounded-xl placeholder:text-slate-600 focus:bg-indigo-50 text-2xl placeholder:text-lg duration-300" 
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Crear Cuenta"
                        className="block uppercase from-indigo-500 to-indigo-700 bg-gradient-to-br w-full text-xl font-bold py-3 px-10 mt-10 mx-auto text-white rounded-xl md:w-auto hover:to-indigo-800 hover:cursor-pointer hover:-translate-y-0.5 duration-300"    
                    />

                    { alerta.msg &&  
                        <Alerta
                            alerta={ alerta }
                        />
                    } 

                </form>

                <nav className='mt-2 font-bold text-base md:text-lg lg:flex lg:justify-center'>
                    <Link 
                        to='/' 
                        className='block text-center my-5 text-gray-500 hover:text-gray-800 duration-300'>
                            ¿Ya tienes cuenta? Inicia Sesión
                    </Link>
                </nav>
            </div>
        </>
    )
}
  
export default Registrar