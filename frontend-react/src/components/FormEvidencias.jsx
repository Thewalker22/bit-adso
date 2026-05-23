import { useEffect } from 'react'
import { useState} from 'react'
import '../styles/form.css'

function FormEvidencia ({onCrear, onEditar, evidencia}) {
 const [nombre,         setNombre]          =useState('')
 const [url,            setUrl]             =useState('')
 const [fechaLimite,    setFechaLimite]     =useState('')
 const [urlMaterial,    setUrlMaterial]     =useState('')
 const [urlClase,       setUrlClase]        =useState('')
 const [error,          setError]           =useState('')

 // Cuando llega una evidencia para editar, llena los input
useEffect(() => {
    if(evidencia){
        setNombre(evidencia.nombre ?? '')
        setUrl(evidencia.url ?? '')
        setFechaLimite(
            evidencia.fecha_limite
            ? new Date(evidencia.fecha_limite).toISOString().slice(0, 16)
            : ''
    )
    setUrlMaterial(evidencia.url_material ?? '')
    setUrlClase(evidencia.url_clase ?? '')
    } else {
// Si no hay evidencia, limpia el formulario
    setNombre('')
    setUrl('')
    setFechaLimite('')
    setUrlMaterial('')
    setUrlClase('')    
    }


}, [evidencia]) // Se ejecuta cada vez que evidencia cambia

const handleCrear = async () => {
    if (!nombre) {
      setError('El nombre es obligatorio')
      return
    }

    try {
      const respuesta = await fetch('/api/evidencias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          url,
          fecha_limite: fechaLimite,
          url_material: urlMaterial,
          url_clase:    urlClase,
          idcomponente: 1
        }),
        credentials: 'include'
      })

      if (!respuesta.ok) {
        const resultado = await respuesta.json()
        setError(resultado.error)
        return
      }

      // Limpiar formulario
      setNombre('')
      setUrl('')
      setFechaLimite('')
      setUrlMaterial('')
      setUrlClase('')
      setError(null)

      // Avisar al Dashboard que se creó una evidencia
      onCrear()

    } catch (err) {
      console.log('Error exacto:', err.message)
      setError('Error al conectar con el servidor')
    }
  }

return (
  <div className="form-evidencia-container">

  <div className="form-evidencia-card">

      <h3 className="form-evidencia-title">
          Nueva evidencia
      </h3>

      {error && (
          <div className="alert alert-danger">
              {error}
          </div>
      )}

      <div className="mb-3">

          <label className="form-label">
              Nombre
          </label>

          <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre de la evidencia"
          />

      </div>

      <div className="mb-3">

          <label className="form-label">
              URL de entrega
          </label>

          <input
              type="url"
              className="form-control"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
          />

      </div>

      <div className="mb-3">

          <label className="form-label">
              Fecha límite
          </label>

          <input
              type="datetime-local"
              className="form-control"
              value={fechaLimite}
              onChange={(e) => setFechaLimite(e.target.value)}
          />

      </div>

      <div className="mb-3">

          <label className="form-label">
              URL Material
          </label>

          <input
              type="url"
              className="form-control"
              value={urlMaterial}
              onChange={(e) => setUrlMaterial(e.target.value)}
              placeholder="https://..."
          />

      </div>

      <div className="mb-4">

          <label className="form-label">
              URL Clase
          </label>

          <input
              type="url"
              className="form-control"
              value={urlClase}
              onChange={(e) => setUrlClase(e.target.value)}
              placeholder="https://..."
          />

      </div>

      <button
          className="btn-crear-evidencia"
          onClick={handleCrear}
      >

          Crear evidencia

      </button>

  </div>

</div>
)
}
export default FormEvidencia
