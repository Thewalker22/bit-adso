import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
        const res = await fetch('http://localhost:3000/api/programas')
        const datos = await res.json()
        setProgramas(datos)
      } catch (err) {
        console.log('Error cargando programas:', err)
      }
    }
    cargarProgramas()
  }, [])

  const registrarUsuario = async () => {
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

      const respuesta = await fetch('/api/usuarios/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          usuario,
          contraseña: contrasena,
          idprograma
        }),
        credentials: 'include'
      })

      const resultado = await respuesta.json()

      if (!respuesta.ok) {
        setError(resultado.error)
        return
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
    <div>
      <h2>Registro de aprendiz</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label>Nombre completo</label>
        <input
          type='text'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder='Tu nombre completo'
        />
      </div>

      <div>
        <label>Usuario</label>
        <input
          type='text'
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder='Nombre de usuario'
        />
      </div>

      <div>
        <label>Contraseña</label>
        <input
          type='password'
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder='Tu contraseña'
        />
      </div>

      <div>
        <label>Programa</label>
        <select
          value={idprograma}
          onChange={(e) => setIdprograma(e.target.value)}
        >
          <option value=''>Selecciona un programa</option>
          {programas.map(p => (
            <option key={p.idprograma} value={p.idprograma}>
              {p.nombre} — Ficha: {p.ficha}
            </option>
          ))}
        </select>
      </div>

      <button onClick={registrarUsuario} disabled={cargando}>
        {cargando ? 'Registrando...' : 'Crear cuenta'}
      </button>

      <p>
        ¿Ya tienes cuenta? <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => navigate('/login')}
        >
          Inicia sesión aquí
        </span>
      </p>
    </div>
  )
}

export default Registro