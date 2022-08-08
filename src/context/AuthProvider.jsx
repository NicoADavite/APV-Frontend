import { useState ,useEffect, createContext } from 'react';
import axiosClient from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [ auth, setAuth ] = useState({});

    useEffect(() => {
        const comprobarToken = async () => {
            const token = localStorage.getItem('token');

            if(!token) return
            
            const config = {
                headers: {
                    "Content-Type": "aplication/json",
                    "Authorization": `Bearer ${token}`
                }
            }

            try {
                const { data } = await axiosClient('/veterinarios/perfil', config);
                setAuth(data)
            } catch (error) {
                console.log(error);
                setAuth({})
            }
        }
        comprobarToken()
    }, []);

    return(
        <AuthContext.Provider 
            value={{
                auth,
                setAuth
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}


export {
    AuthProvider
}

export default AuthContext;