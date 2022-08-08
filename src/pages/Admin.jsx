import { useState, useEffect } from 'react'
import useAuth from "../hooks/useAuth";

const Admin = () => {

    // const [ veterinario, setVeterinario ] = useState({});

    useEffect(() => {
        const datosUsuario = () => {
            const auth = useAuth();
            // // setVeterinario(auth)
            // console.log(auth);
        }
        datosUsuario()
    }, []);

    return (
        <>
            {/* {
                !veterinario &&
                    <p>No hay veterinario</p>
            }
            {
                veterinario &&
                    <p>Si hay veterinario: {`${veterinario.nombre}`}</p>
            } */}
        </>
    )
}

export default Admin