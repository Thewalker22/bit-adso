import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { registrarUsuario } from '../services/usuariosService'
import {cargarProg}  from '../services/usuariosService'

function Registro() {
  const [nombre,      setNombre]      = useState('')
  const [usuario,     setUsuario]     = useState('')
  const [contrasena,  setContrasena]  = useState('')
  const [idprograma,  setIdprograma]  = useState('')
  const [programas,   setProgramas]   = useState([])
  const [error,       setError]       = useState(null)
  const [cargando,    setCargando]    = useState(false)

  const navigate = useNavigate()

  // Carga los programas disponibles al abrir el formulario
  useEffect(() => {
    const cargarProgramas = async () => {
        try {
            const datos = await cargarProg()
            console.log(datos)

            if(datos.ok){
              console.log('Tipo de datos:', typeof datos.data, datos.data)
              setProgramas(datos.data)
            }
        } catch (err) {

            console.log('Error cargando programas:', err)

        }
    }
    cargarProgramas()
}, [])

  const registrarusuario = async () => {
    // Validar campos vacíos
    if (!nombre || !usuario || !contrasena || !idprograma) {
      setError('Todos los campos son obligatorios')
      return
    }

    // Validar que el nombre solo tenga letras
    const soloTexto = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
    if (!soloTexto.test(nombre)) {
      setError('El nombre solo debe contener letras')
      return
    }

    try {
      setCargando(true)
      setError(null)

      const resultado = await registrarUsuario({
        nombre,
        usuario,
        contraseña: contrasena,
        idprograma
      })
         
      if (!resultado.ok) {
        setError(resultado.data?.error)  
    }
      // Registro exitoso → redirige al login
      navigate('/login')

    } catch (err) {
      console.log('Error:', err.message)
      setError('Error al conectar con el servidor')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 login-container">

      <div className="card shadow p-4" style={{ width: '400px' }}>

          <h2 className="text-center mb-4">Registro de aprendiz</h2>

          {error && <div className="alert alert-danger" >{error}</div>}

          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input
              type='text'
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder='Tu nombre completo'
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type='text'
              className="form-control"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder='Nombre de usuario'
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type='password'
              className="form-control"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder='Tu contraseña'
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Programa</label>
            <select
               className="form-control"
              value={idprograma}
              onChange={(e) => setIdprograma(e.target.value)}
            >
              <option value=''>Selecciona un programa <span></span></option>
              {programas.map(p => (
                <option key={p.idprograma} value={p.idprograma}>
                  {p.nombre} — Ficha: {p.ficha}
                </option>
              ))}
            </select>
          </div>

          <button 
            className="btn btn-primary w-100 mt-4" 
          onClick={registrarusuario} disabled={cargando}>
            {cargando ? 'Registrando...' : 'Crear cuenta'}
          </button>

          <p className="text-center mt-3">
            ¿Ya tienes cuenta? <span
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => navigate('/login')}
            >
              Inicia sesión aquí
            </span>
          </p>

      </div>

    </div>
  )
}

export default Registro