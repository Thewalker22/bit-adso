import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login (){
    const [usuario, setUsuario]      = useState('')
    const [contrasena, setContrasena] = useState('')
    const [error, setError]     = useState('')
    const [cargando, setCargando]   = useState('false')

    const navigate = useNavigate()
   
    const iniciarsesion = async () => {
        //Validar campos vacíos
        if (!usuario || !contrasena){
            setError('Todos los campos son requeridos')
            return
        }
        try{
            setCargando(true)
            setError(null)
    
            const respuesta = await fetch('/api/usuarios/login' , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario, contraseña: contrasena}),
                credentials: 'include'
            })
            const resultado = await respuesta.json()
    
            if (!respuesta.ok){
                setError(resultado.error)
                return
            }
    
            //Login exitoso - redirige al dashboard
            navigate('/dashboard')
        }catch (err) {
            setError('Error al conectar con el servidor')   
        }finally{
            setCargando(false)
        }
    }

    return(
        <div>
            <h2>Iniciar sesión</h2>

            {error && <p style={{ color:'red'}}>{error}</p>}

            <div>
                <label>Usuario</label>
                <input type='text' 
                value={usuario}
                onChange={(e => setUsuario(e.target.value))}
                placeholder='Tu usuario'
                />
            </div>

            <div>
                <label>Contraseña</label>
                <input type='password' 
                value={contrasena}
                onChange={(e => setContrasena(e.target.value))}
                placeholder='Tu contraseña'
                />
            </div>

            <button onClick={iniciarsesion} disable={cargando}>
            {cargando ? 'Ingresar' : 'Ingresando...'}
            </button>
            
            <p>¿No tienes cuenta <a href="/registro">Registrate aquí</a> </p>
          
        </div>

       
    )
}

export default Login