import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {login} from '../services/usuariosService'
import '../styles/login.css'


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
    
            const respuesta = await login(usuario, contrasena) 
    
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
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 login-container">
        <div className="card shadow p-4" style={{ width: '400px' }}>

            <h2 className="text-center mb-4">Iniciar sesión</h2>

            {error && <div className="alert alert-danger" >{error}</div>}

            <div className="mb-3">
                <label className="form-label">Usuario</label>
                <input 
                type='text' 
                className="form-control"
                value={usuario}
                onChange={(e => setUsuario(e.target.value))}
                placeholder='Tu usuario'
                />
            </div>

            <div>
                <label className="form-label">Contraseña</label>
                <input 
                type='password' 
                className="form-control"
                value={contrasena}
                onChange={(e => setContrasena(e.target.value))}
                placeholder='Tu contraseña'
                />
            </div>

            <button 
            className="btn btn-primary w-100 mt-4" 
            onClick={iniciarsesion} disable={cargando}>
            {cargando ? 'Ingresar' : 'Ingresando...'}
            </button>

            <p className="text-center mt-3">

            ¿No tienes cuenta?

            <a href="/registro" className="ms-2">
                Regístrate aquí
            </a>

        </p>

        </div>
            
      
    </div>

       
    )
}

export default Login